function lagSource(kode, r) {
  r[kode] = {
    type: 'MVT',
    url: `https://tiles.artsdatabanken.no/data/${kode}/{z}/{x}/{y}.pbf`,
    bounds: [-9.676172, 57.958206, 34.687848, 81.028018],
    //      bounds: [4.704237, 57.960319, 31.16815, 70.907624],
    max_zoom: 8,
  }
}

function lagSources(aktiveLag, katalogKode) {
  const r = {}
  if (katalogKode) lagSource(katalogKode, r)
  aktiveLag.forEach(lag => {
    if (lag.erSynlig && lag.type === 'polygon') lagSource(lag.kode, r)
  })
  r.normals = {
    type: 'Raster',
    url:
      'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
    max_zoom: 15,
  }
  return r
}

function lagLayerSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSources, lagLayerSource }
