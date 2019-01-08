const styles = {
  po: {
    base: "points",
    texture: "/marker.png"
  },
  boundary: {
    base: "lines",
    order: 150,
    blend: "overlay"
  },
  mu_polygons: {
    base: "polygons",
    blend: "multiply"
  },
  mu_lines: {
    base: "lines",
    blend: "multiply"
  },
  road_names: {
    base: "text",
    draw: {
      font: {
        family: "Roboto",
        size: "12px",
        fill: "black",
        stroke: {
          color: "white",
          width: "1px"
        }
      }
    }
  }
};

function createStyles() {
  return styles;
}

export { createStyles };
