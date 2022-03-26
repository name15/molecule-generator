import { Vector, Graph } from "./main";

// >>> Utils
class Utils {
  static lerp(a: number, b: number, t: number): number {
    if (t < 0) return a;
    if (t > 1) return t;
    return a * (1 - t) + b * t;
  }

  static shuffle<T>(array: T[]): void {
    let currentIndex = this.length,
      randomIndex;

    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; // prettier-ignore
    }
  }

  static unique<T>(array: T[]): T[] {
    return array.reduce((arr: any[], num: any) => {
      if (!arr.includes(num)) arr.push(num);
      return arr;
    }, []);
  }
}

// >>> Physics
export class Physics {
  dt = 0.5;
  iterations = 3;
  repulsionForce = 1;

  edgeTable: number[][];

  constructor(public graph: Graph) {
    // Randomize vertices
    this.graph.vertices.forEach((vertex, i) => {
      vertex.coords = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };
    });

    // Generate edge table
    this.edgeTable = [];
    for (let i = 0; i < this.graph.vertices.length; i++) {
      this.edgeTable.push(Array(this.graph.vertices.length).fill(0));
    }

    this.graph.edges.forEach((edge) => {
      this.edgeTable[edge.vertexA][edge.vertexB] = edge.order;
      this.edgeTable[edge.vertexB][edge.vertexA] = edge.order;
    });
  }

  update() {
    let updateEdge = (a: Vector, b: Vector, order: number) => {
      let center = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
      };

      let offset = {
        x: a.x - b.x,
        y: a.y - b.y
      };

      let currentLength = offset.x * offset.x + offset.y * offset.y;

      let targetLength;
      if (order === 0) targetLength = currentLength + this.repulsionForce;
      else targetLength = 1 / order;

      let factor = 0.5 / currentLength;
      factor *= Utils.lerp(currentLength, targetLength, this.dt);

      offset.x *= factor;
      offset.y *= factor;

      a.x = center.x + offset.x;
      a.y = center.y + offset.y;

      b.x = center.x - offset.x;
      b.y = center.y - offset.y;
    };

    for (let i = 0; i < this.iterations; i++) {
      for (let a = 0; a < this.graph.vertices.length; a++) {
        for (let b = 0; b < this.graph.vertices.length; b++) {
          if (a >= b) continue;

          let vertexA = this.graph.vertices[a];
          let vertexB = this.graph.vertices[b];

          updateEdge(vertexA.coords, vertexB.coords, this.edgeTable[a][b]);
        }
      }
    }
  }
}

// >>> Rendering
export class Rendering {
  prеcision = 3;
  radius = 0.25;
  strokeWidth = 0.015;
  bondOffset = 0.045;
  viewboxMargin = { x: 0.66, y: 0.66 };

  constructor(public graph: Graph) {}

  static valenceToString = (valence: number) =>
      valence === 1 ? "H" :
      valence === 2 ? "O" :
      valence === 3 ? "N" :
      valence === 4 ? "C" : "?"; // prettier-ignore

  draw(svg: SVGSVGElement) {
    // Remove previous SVG graph
    while (svg.firstChild) {
      svg.firstChild.remove();
    }

    // Draw vertices
    let verticesGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    for (let i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      let circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );

      circle.setAttribute("r", this.radius.toFixed(this.prеcision));

      circle.setAttribute("stroke", "black");
      circle.setAttribute("fill", "white");
      circle.setAttribute(
        "stroke-width",
        this.strokeWidth.toFixed(this.prеcision)
      );

      circle.setAttribute("cx", vertex.coords.x.toFixed(this.prеcision));
      circle.setAttribute("cy", vertex.coords.y.toFixed(this.prеcision));

      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.textContent = Rendering.valenceToString(vertex.valence);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "central");
      text.setAttribute("font-size", this.radius.toFixed(this.prеcision));

      text.setAttribute("fill", "black");
      text.setAttribute("stroke-color", "black");

      text.setAttribute("x", vertex.coords.x.toFixed(this.prеcision));
      text.setAttribute("y", vertex.coords.y.toFixed(this.prеcision));

      verticesGroup.append(circle, text);
    }

    // Draw edges
    let edgesGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    for (let i = 0; i < this.graph.edges.length; i++) {
      let edge = this.graph.edges[i];

      let vertexA = this.graph.vertices[edge.vertexA];
      let vertexB = this.graph.vertices[edge.vertexB];

      let direction = {
        x: vertexB.coords.x - vertexA.coords.x,
        y: vertexB.coords.y - vertexA.coords.y
      };
      let length = Math.sqrt(
        direction.x * direction.x + direction.y * direction.y
      );
      direction.x /= length;
      direction.y /= length;

      let normal = {
        x: -direction.y,
        y: direction.x
      };

      let midpoint = {
        x: (
                  (vertexA.coords.x + direction.x * this.radius) +
                  (vertexB.coords.x - direction.x * this.radius)
              ) / 2, // prettier-ignore
        y: (
                  (vertexA.coords.y + direction.y * this.radius) +
                  (vertexB.coords.y - direction.y * this.radius)
              ) / 2 // prettier-ignore
      };

      for (let j = 0; j < edge.order; j++) {
        let line1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line1.setAttribute("stroke", "black");
        line1.setAttribute(
          "stroke-width",
          this.strokeWidth.toFixed(this.prеcision)
        );

        let line2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line2.setAttribute("stroke", "black");
        line2.setAttribute(
          "stroke-width",
          this.strokeWidth.toFixed(this.prеcision)
        );

        let vertexANew = { ...vertexA.coords };
        let vertexBNew = { ...vertexB.coords };
        let midpointNew = { ...midpoint };

        let factor = (j - (edge.order - 1) / 2) * this.bondOffset;
        vertexANew.x += factor * normal.x;
        vertexANew.y += factor * normal.y;
        vertexBNew.x += factor * normal.x;
        vertexBNew.y += factor * normal.y;
        midpointNew.x += factor * normal.x;
        midpointNew.y += factor * normal.y;

        line1.setAttribute("x1", vertexANew.x.toFixed(this.prеcision));
        line1.setAttribute("y1", vertexANew.y.toFixed(this.prеcision));
        line1.setAttribute("x2", midpointNew.x.toFixed(this.prеcision));
        line1.setAttribute("y2", midpointNew.y.toFixed(this.prеcision));

        line2.setAttribute("x1", vertexBNew.x.toFixed(this.prеcision));
        line2.setAttribute("y1", vertexBNew.y.toFixed(this.prеcision));
        line2.setAttribute("x2", midpointNew.x.toFixed(this.prеcision));
        line2.setAttribute("y2", midpointNew.y.toFixed(this.prеcision));

        edgesGroup.append(line1, line2);
      }
    }

    svg.append(edgesGroup, verticesGroup);

    // Update viewbox
    let min = { x: Infinity, y: Infinity };
    let max = { x: -Infinity, y: -Infinity };

    for (let i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      min.x = Math.min(vertex.coords.x, min.x);
      min.y = Math.min(vertex.coords.y, min.y);

      max.x = Math.max(vertex.coords.x, max.x);
      max.y = Math.max(vertex.coords.y, max.y);
    }

    min.x -= this.viewboxMargin.x;
    min.y -= this.viewboxMargin.y;

    max.x += this.viewboxMargin.x;
    max.y += this.viewboxMargin.y;

    let size = {
      x: max.x - min.x,
      y: max.y - min.y
    };

    svg.setAttribute(
      "viewBox",
      `${min.x.toFixed(this.prеcision)} ${min.y.toFixed(
        this.prеcision
      )} ${size.x.toFixed(this.prеcision)} ${size.y.toFixed(this.prеcision)}`
    );
  }
}
