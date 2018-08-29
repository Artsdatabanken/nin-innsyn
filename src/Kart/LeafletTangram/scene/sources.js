const sources = {
  AO: {
    type: 'MVT',
    url: 'https://tiles.artsdatabanken.no/data/AO/{z}/{x}/{y}.pbf',
    max_zoom: 11,
    bounds: [4.704237, 57.960319, 31.16815, 70.907624],
  },
  MI: {
    type: 'MVT',
    url: 'https://tiles.artsdatabanken.no/data/MI/{z}/{x}/{y}.pbf',
    bounds: [4.704237, 57.960319, 31.16815, 70.907624],
    max_zoom: 8,
  },
  NA: {
    type: 'MVT',
    url: 'https://tiles.artsdatabanken.no/data/NA/{z}/{x}/{y}.pbf',
    bounds: [4.704237, 57.960319, 31.16815, 70.907624],
    max_zoom: 13,
  },
  VV: {
    type: 'MVT',
    url: 'https://tiles.artsdatabanken.no/data/VV/{z}/{x}/{y}.pbf',
    bounds: [-9.676172, 57.958206, 34.687848, 81.028018],
    max_zoom: 13,
  },
  'terrain-normals': {
    type: 'Raster',
    url2: 'https://tile.nextzen.com/nextzen/terrain/v1/normal/{z}/{x}/{y}.png',
    url3:
      'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
    url: 'http://localhost:8081/dummymap/',
  },
  mapzen: {
    type: 'MVT',
    url: 'https://tiles.artsdatabanken.no/data/openstreetmap/{z}/{x}/{y}.pbf',
    tile_size: 512,
    max_zoom: 16,
    rasters: ['terrain-normals'],
  },
}

function createSources(aktivKode) {
  return sources
}

function lagSource(kode) {
  const prefix = hack(kode.substring(0, 2))
  return { source: prefix, layer: prefix }
}

function hack(prefix) {
  // HACK: Fordi data ikke alltid ligger der man skulle tro.
  switch (prefix) {
    case 'BS':
    case 'RL':
      return 'NA'
    default:
      return prefix
  }
}

export { createSources, lagSource }
