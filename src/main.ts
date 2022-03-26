import { Physics, Rendering } from "./modules";

// Graph classes
export interface Vector {
  x: number;
  y: number;
}

export class Vertex {
  constructor(
    public valence: number,
    public rest = valence,
    public connectedVertices: number[] = [],
    public coords: Vector = { x: 0, y: 0 }
  ) {}
}

export class Edge {
  constructor(
    public vertexA: number,
    public vertexB: number,
    public order: number
  ) {}
}

export class Graph {
  constructor(
    public vertices: Vertex[],
    public edges: Edge[],
    public groups: number[][]
  ) {}

  // Returns a copy of the original graph
  static copy(graph: Graph) {
    let vertices = graph.vertices.map(
      (vertex) =>
        new Vertex(
          vertex.valence,
          vertex.rest,
          [...vertex.connectedVertices],
          vertex.coords
        )
    );
    let edges = graph.edges.map(
      (edge) => new Edge(edge.vertexA, edge.vertexB, edge.order)
    );
    let groups = graph.groups.map((group) => [...group]);

    return new Graph(vertices, edges, groups);
  }

  // TODO
  static isomorphic(graphA: Graph, graphB: Graph): boolean {
    if (graphA.vertices.length !== graphB.vertices.length) return false;

    let matchVertex = function (
      a: number,
      b: number,
      m: Map<number, number> = new Map()
    ): boolean {
      // console.log(a, b, m);
      let vertexA = graphA.vertices[a];
      let vertexB = graphB.vertices[b];

      if (
        vertexA.valence !== vertexB.valence ||
        vertexA.connectedVertices.length !== vertexB.connectedVertices.length ||
        vertexA.rest !== vertexB.rest
      )
        return false;

      // Inspect connected vertices
      for (let a2 = 0; a2 < vertexA.connectedVertices.length; a2++) {
        let b2 = vertexA.connectedVertices[a2];
        if (m.has(a2)) continue;

        let match = false;
        for (let j = 0; j < vertexB.connectedVertices.length; j++) {
          let d = vertexB.connectedVertices[j];

          let matched = new Map(m);
          matched.set(a2, b2);

          // TODO: Recursive call
          if (matchVertex(b2, d, matched)) {
            match = true;
            break;
          }
        }
        if (!match) return false;
      }

      return true;
    };

    for (let i = 0; i < graphA.groups.length; i++) {
      let groupA = graphA.groups[i];

      let match = false;
      for (let j = 0; j < graphB.groups.length; j++) {
        let groupB = graphB.groups[j];

        if (groupA.length === groupB.length) {
          if (matchVertex(groupA[0], groupB[0])) {
            match = true;
            break;
          }
        }
      }
      if (!match) return false;
    }

    return true;
  }

  // Connects two verticies of a graph together
  /*
  connect(vertexA: Vertex, vertexB: Vertex, order: number) {
      let a = this.vertices.findIndex((vertex) => vertex == vertexA);
      let b = this.vertices.findIndex((vertex) => vertex == vertexB);

      if (a == -1) a = this.vertices.push(vertexA) - 1;
      if (b == -1) b = this.vertices.push(vertexB) - 1;

      let edge = new Edge(a, b, order);
      this.edges.push(edge);

      vertexA.rest -= order;
      vertexB.rest -= order;
  }
  */

  // Converts the graph to an SVG Element
  toSVG(): SVGSVGElement {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "150px");
    svg.setAttribute("height", "150px");

    let physics = new Physics(this);
    physics.update();

    let renderer = new Rendering(this);
    renderer.draw(svg);

    return svg;
  }
}

export class Generator {
  // An array, containing the results of the generator
  graphs: Graph[] = [];

  iteration: number = 0;
  constructor(atoms: number[]) {
    console.log(`Initialization`);

    let heading = document.createElement("h1");
    heading.textContent = `Initialize`;
    document.body.appendChild(heading);

    // Initial conditions
    this.iteration = 1;
    let graph = new Graph(
      [...atoms].map((atom) => new Vertex(atom)),
      [],
      [...atoms].map((atom, i) => [i])
    );

    document.body.appendChild(graph.toSVG());

    this.graphs.push(graph);
  }

  // Every iteration the generator adds one new edge to the graph
  nextIteration() {
    console.log(`Iteration #${this.iteration}`);

    // Print the current iteration to the DOM
    let heading = document.createElement("h1");
    heading.textContent = `Iteration #${this.iteration}`;
    document.body.appendChild(heading);

    let updatedGraphs: Graph[] = [];
    this.graphs.forEach((g) => {
      for (let a = 0; a < g.vertices.length; a++) {
        for (let b = 0; b < g.vertices.length; b++) {
          if (a >= b) continue;

          let graph = Graph.copy(g);

          // Merge two groups
          let groupA = graph.groups.find((group) => group.includes(a)) ?? [];
          let groupB = graph.groups.find((group) => group.includes(b)) ?? [];

          let groupAID = graph.groups.indexOf(groupA);
          let groupBID = graph.groups.indexOf(groupB);

          if (groupA !== groupB) {
            graph.groups = graph.groups.filter(
              (group, i) => i !== groupAID && i !== groupBID
            );

            graph.groups.unshift(groupA.concat(groupB));
          }

          // Add an edge
          let edge = graph.edges.find(
            (edge) =>
              (edge.vertexA === a && edge.vertexB === b) ||
              (edge.vertexA === b && edge.vertexB === a)
          );

          if (edge) edge.order++;
          else edge = new Edge(a, b, 1);
          graph.edges.push(edge);

          // Update the two vertices
          let vertexA = graph.vertices[a];
          let vertexB = graph.vertices[b];

          vertexA.rest--;
          vertexB.rest--;

          vertexA.connectedVertices.push(b);
          vertexB.connectedVertices.push(a);

          // TODO: Compare with previous graphs
          let isomorphic = false;
          for (let i = 0; i < updatedGraphs.length; i++) {
            if (Graph.isomorphic(graph, updatedGraphs[i])) {
              isomorphic = true;
              break;
            }
          }
          if (isomorphic) continue;

          document.body.appendChild(graph.toSVG());
          updatedGraphs.push(graph);
        }
      }
    });
    console.log(updatedGraphs);
    this.graphs = updatedGraphs;

    this.iteration++;
  }
}

console.clear();

// INPUT
let atoms: number[] = [1, 1, 1, 3, 3, 3];
let generator = new Generator(atoms);

generator.nextIteration();
generator.nextIteration();

/*
graph.restAtoms.unique().forEach((valence) => {
                  let order = 1; // TODO

                  let newGraph = Graph.copy(graph);

                  let vertexA = newGraph.vertices[a];
                  let vertexB = new Vertex(valence);

                  let b = newGraph.vertices.push(vertexB) - 1;

                  let edge = new Edge(a, b, order);
                  newGraph.edges.push(edge);

                  vertexA.rest -= order;
                  vertexB.rest -= order;

                  document.body.appendChild(graph.toSVG());
                  newGraphs.push(newGraph);
              });
*/
