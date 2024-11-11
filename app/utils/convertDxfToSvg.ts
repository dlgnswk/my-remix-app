interface Vertex {
  x: number;
  y: number;
}

interface LwPolyline {
  type: string;
  vertices: Vertex[];
  handle: string;
  layer: string;
}

function convertPolylineToPath(vertices: Vertex[]): string {
  if (vertices.length === 0) return "";

  let pathData = `M ${vertices[0].x} ${vertices[0].y}`;

  for (let i = 1; i < vertices.length; i++) {
    pathData += ` L ${vertices[i].x} ${vertices[i].y}`;
  }

  pathData += " Z";

  return pathData;
}

export const convertStarToSvg = (dxfObject: any) => {
  const extMin = dxfObject.header.$EXTMIN;
  const extMax = dxfObject.header.$EXTMAX;

  const padding = 10;
  const width = extMax.x - extMin.x + padding * 2;
  const height = extMax.y - extMin.y + padding * 2;

  let svg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${extMin.x - padding} ${extMin.y - padding} ${width} ${height}"
  >`;

  svg += `
    <defs>
      <style>
        .polyline {
          fill: #e0e0e0;
          stroke: #000;
          stroke-width: 1;
        }
      </style>
    </defs>
  `;

  svg += '<g class="star-shape">';

  dxfObject.entities.forEach((entity: LwPolyline) => {
    if (entity.type === "LWPOLYLINE") {
      const pathData = convertPolylineToPath(entity.vertices);
      svg += `<path class="polyline" d="${pathData}" />`;
    }
  });

  svg += "</g></svg>";

  return svg;
};
