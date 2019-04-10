import sysconfig from "../../../../config";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        raster: {
          order: 700
        }
      }
    }
  };
  return layer;
}

/*
function quantize(value) {
  return (
    Math.trunc(value[0] / 25 + 0.25) + '-' + Math.trunc(value[1] / 25 + 0.25)
  )
}*/

function lagStyle(format, drawArgs) {
  const { opplyst, url } = drawArgs;
  let palettUrl = opplyst.url || url;
  const newPalette = `${
    sysconfig.storageUrl
  }${palettUrl}/raster_indexed_palette.png`;

  if (this.palette1 !== this.palette2 || !this.palette1)
    this.palette1 = this.palette2 || newPalette;
  this.palette2 = newPalette;
  const gradient = {
    base: "raster",
    blend: "multiply",
    animated: false,
    shaders: {
      uniforms: {
        palette1: this.palette1,
        palette2: this.palette2,
        depth: 1 - (drawArgs.depth || 0) / 8 - 0.5 / 8
      },
      blocks: {
        global: `
        precision highp float;
        highp float scaler = 1./512.;
        highp float rgbaToIndex(vec4 rgba) {
            // g = x/256., b = x % 256
            return (rgba.g*128. + rgba.b/2. + 0.5*scaler);
          }`,
        color: `
        float v = rgbaToIndex(sampleRaster(0));
        vec4 fill1 = texture2D(palette1, vec2(v, depth));
        vec4 fill2 = texture2D(palette2, vec2(v, depth));
        vec4 fill = mix(fill1, fill2, clamp(u_time*2.5,0.,1.));
        color = fill2;
      `
      }
    }
  };
  return { name: "raster", value: gradient };
}

function lagSource({ url, zoom }, { bbox }) {
  const source = sysconfig.createTileSource(url, "Raster", zoom, bbox);
  //  source.tile_size = 256;
  return source;
}

export default { drawAll, lagSource, lagStyle };
