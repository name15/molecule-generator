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
    public connectedVertices: { id: number; order: number }[] = [],
    public coords: Vector = { x: 0, y: 0 }
  ) {}

  static compare(vertexA: Vertex, vertexB: Vertex): boolean {
    return (
      vertexA.valence === vertexB.valence &&
      vertexA.connectedVertices.length === vertexB.connectedVertices.length &&
      vertexA.rest === vertexB.rest
    );
  }
}

export class Edge {
  constructor(
    public vertexA: number,
    public vertexB: number,
    public order: number
  ) {}
}

export class Group extends Array<number> {
  static compare(groupA: Group, groupB: Group): boolean {
    return groupA.length === groupB.length;
  }
}

export class Graph {
  constructor(
    public vertices: Vertex[],
    public edges: Edge[],
    public groups: Group[]
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

  static compare(graphA: Graph, graphB: Graph): boolean {
    return (
      graphA.vertices.length === graphB.vertices.length &&
      graphA.edges.length === graphB.edges.length &&
      graphA.groups.length === graphB.groups.length
    );
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

// TEMP
const ifconsole = {
  active: false,
  log: function (...data: any[]): void {
    if (this.active) console.log(...data);
  },
  warn: function (...data: any[]): void {
    if (this.active) console.warn(...data);
  }
};

class Analytics {
  // Determines whether two graphs are isomorphic
  static isIsomorphic(graphA: Graph, graphB: Graph): boolean {
    if (!Graph.compare(graphA, graphB)) return false;

    let matchedGroups = Analytics.matchGroup(graphA, graphB);

    return matchedGroups !== undefined;
  }

  // This is a recursive function, exclusively used in the "isIsomorphic" method
  // Attempts to match the groups of two graphs with each other and returns the indices of matched groups
  private static matchGroup(
    graphA: Graph,
    graphB: Graph,
    matches: number[] = []
  ): number[] | undefined {
    ifconsole.log(matches);

    let groupId = matches.length;
    let groupA = graphA.groups[groupId];
    for (let i = 0; i < graphB.groups.length; i++) {
      if (matches.includes(i)) {
        ifconsole.log("Skip");
        continue;
      }

      let groupB = graphB.groups[i];
      if (!Group.compare(groupA, groupB)) {
        ifconsole.log("No match yet.");
        continue;
      }

      ifconsole.log("Match found!");

      let vertexAId = groupA[0];
      let vertexA = graphA.vertices[vertexAId];

      let matchedVertices: { a: number; b: number }[] | undefined;
      for (let j = 0; j < groupB.length; j++) {
        let vertexBId = groupB[j];
        let vertexB = graphB.vertices[vertexBId];

        if (!Vertex.compare(vertexA, vertexB)) continue;

        ifconsole.log(`>>> Input #${j}: ${vertexAId} ${vertexBId}`);
        matchedVertices = Analytics.matchVertex(
          graphA,
          graphB,
          vertexA,
          vertexB,
          [{ a: vertexAId, b: vertexBId }]
        );
        ifconsole.log(`<<< Output #${j}: `, matchedVertices);

        if (matchedVertices) break;
      }

      ifconsole.log("Definite output: ", matchedVertices);
      if (matchedVertices === undefined) continue;

      let fork = [...matches];
      fork.push(i);

      if (groupId === graphA.groups.length - 1) {
        ifconsole.warn("All groups matched. Yahoo!", fork);
        return fork;
      }

      return Analytics.matchGroup(graphA, graphB, fork);
    }
  }

  // TODO: Work in progress...
  // This is a recursive function, exclusively used in the "isIsomorphic" method
  // Attempts to match the vertices of two groups with each other and returns the indices of matched vertices
  private static matchVertex(
    graphA: Graph,
    graphB: Graph,
    vertexA: Vertex,
    vertexB: Vertex,
    matches: { a: number; b: number }[]
  ): { a: number; b: number }[] | undefined {
    for (let i = 0; i < vertexA.connectedVertices.length; i++) {
      let connectA = vertexA.connectedVertices[i];
      if (matches.find((match) => match.a === connectA.id)) continue;

      let vertA = graphA.vertices[connectA.id];

      for (let j = 0; j < vertexB.connectedVertices.length; j++) {
        let connectB = vertexB.connectedVertices[j];
        if (connectA.order !== connectB.order) continue;
        if (matches.find((match) => match.b === connectB.id)) continue;

        let vertB = graphB.vertices[connectB.id];

        if (!Vertex.compare(vertA, vertB)) {
          ifconsole.log("\tNo match yet.");
          continue;
        }

        let fork = matches.map((match) => {
          return { ...match };
        });
        fork.push({ a: connectA.id, b: connectB.id });

        ifconsole.log("\tMatch found!", fork);

        return Analytics.matchVertex(graphA, graphB, vertA, vertB, fork);
      }
    }
    return matches;
  }
}

interface GeneratorSettings {
  allowMultipleGroups: boolean;
  maximumBondOrder: number;
}

class Generator {
  // Settings
  settings: GeneratorSettings;

  // Results of the generator
  graphs: Graph[] = [];

  // Current iteration
  iteration: number = 0;

  // Input: An array of atom valences and settings for the generator
  constructor(atoms: number[], settings?: GeneratorSettings) {
    let sum = atoms.reduce((a, sum) => (sum += a), 0);
    if (sum % 2 !== 0) throw new Error(`Invalid atom sequence '${atoms}'`);

    this.settings = settings ?? {
      allowMultipleGroups: false,
      maximumBondOrder: 3
    };

    // Initialization
    console.log(`Initialization`);

    let heading = document.createElement("h1");
    heading.textContent = `Initialize`;
    document.body.appendChild(heading);

    this.iteration = 1;
    let graph = new Graph(
      [...atoms].map((atom) => new Vertex(atom)),
      [],
      [...atoms].map((atom, i) => [i])
    );

    document.body.appendChild(graph.toSVG());

    this.graphs.push(graph);

    // Construct the molecule
    for (let i = 0; i < sum / 2; i++) {
      this.nextIteration();
    }
  }

  // Every iteration the generator adds one new edge to the graph
  private nextIteration() {
    // Print the current iteration to the DOM
    let heading = document.createElement("h1");
    heading.textContent = `Iteration #${this.iteration}`;
    document.body.appendChild(heading);

    let updatedGraphs: Graph[] = [];
    this.graphs.forEach((g) => {
      // Connect two vertices with each other
      for (let a = 0; a < g.vertices.length; a++) {
        let usedValencesB: number[] = []; // Optimization
        for (let b = 0; b < g.vertices.length; b++) {
          // Pick two different vertices
          if (a >= b) continue;

          // Check the bond order
          if (g.vertices[a].rest === 0 || g.vertices[b].rest === 0) continue;

          // Fork the graph
          let graph = Graph.copy(g);

          // Merge two groups
          let groupA = graph.groups.find((group) => group.includes(a)) ?? [];
          let groupB = graph.groups.find((group) => group.includes(b)) ?? [];

          // Optimization: Keep track of the used valences
          if (groupB.length === 1) {
            let valenceB = graph.vertices[b].valence;

            if (usedValencesB.includes(valenceB)) continue;
            else usedValencesB.push(valenceB);
          }

          let groupAID = graph.groups.indexOf(groupA);
          let groupBID = graph.groups.indexOf(groupB);

          if (groupA !== groupB) {
            graph.groups = graph.groups.filter(
              (group, i) => i !== groupAID && i !== groupBID
            );

            graph.groups.unshift(groupA.concat(groupB));
          }

          if (!this.settings.allowMultipleGroups) {
            // Allow graphs with one main group only
            let allowed = true;
            for (let i = 1; i < graph.groups.length; i++) {
              if (graph.groups[i].length > 1) {
                allowed = false;
                break;
              }
            }
            if (!allowed) continue;
          }

          // Add an edge
          let edge = graph.edges.find(
            (edge) =>
              (edge.vertexA === a && edge.vertexB === b) ||
              (edge.vertexA === b && edge.vertexB === a)
          );

          if (edge) {
            if (edge.order === this.settings.maximumBondOrder) continue;
            edge.order++;
          } else {
            edge = new Edge(a, b, 1);
            graph.edges.push(edge);
          }

          // Update the two vertices
          let vertexA = graph.vertices[a];
          let vertexB = graph.vertices[b];

          vertexA.rest--;
          vertexB.rest--;

          let connectA = vertexA.connectedVertices.find(
            (connect) => connect.id === b
          );
          if (connectA) {
            connectA.order = edge.order;
          } else {
            vertexA.connectedVertices.push({
              id: b,
              order: edge.order
            });
          }

          let connectB = vertexB.connectedVertices.find(
            (connect) => connect.id === a
          );
          if (connectB) {
            connectB.order = edge.order;
          } else {
            vertexB.connectedVertices.push({
              id: a,
              order: edge.order
            });
          }

          // Compare with previous graphs
          let isomorphic = -1;
          for (let i = 0; i < updatedGraphs.length; i++) {
            if (Analytics.isIsomorphic(graph, updatedGraphs[i])) {
              isomorphic = i;
              break;
            }
          }

          // Render on DOM
          let div = document.createElement("div");
          let text = document.createElement("p");
          text.setAttribute("style", "position: absolute");
          let svg = graph.toSVG();
          div.append(text, svg);

          if (isomorphic !== -1) {
            text.textContent = `Isomer: ${isomorphic}`;
            svg.setAttribute(
              "style",
              "background-color: hsla(0, 50%, 50%, 33%)"
            );

            document.body.appendChild(div);
            continue;
          }

          text.textContent = `Id: ${updatedGraphs.length}`;
          svg.setAttribute(
            "style",
            "background-color: hsla(120, 50%, 50%, 33%)"
          );

          document.body.appendChild(div);

          // Save the unique graphs for the next iteration
          updatedGraphs.push(graph);
        }
      }
    });
    console.log(`Iteration #${this.iteration}`, updatedGraphs);
    this.graphs = updatedGraphs;

    this.iteration++;
  }
}

// INPUT
let atoms: number[] = [3, 3, 3, 1, 1, 1];
new Generator(atoms);
