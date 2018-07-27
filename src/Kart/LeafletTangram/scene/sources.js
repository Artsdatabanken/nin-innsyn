const sources = {
  BS: {
    type: 'MVT',
    url: 'http://tiles.artsdatabanken.no/data/NA/{z}/{x}/{y}.pbf',
    max_zoom: 13,
  },
  MI: {
    type: 'MVT',
    url: 'http://tiles.artsdatabanken.no/data/MI/{z}/{x}/{y}.pbf',
    max_zoom: 8,
  },
  NA: {
    type: 'MVT',
    url: 'http://tiles.artsdatabanken.no/data/NA/{z}/{x}/{y}.pbf',
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
    url: 'http://tiles.artsdatabanken.no/data/openstreetmap/{z}/{x}/{y}.pbf',
    //    'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
    url_subdomains: ['a', 'b', 'c', 'd'],
    url_params: {
      api_key: 'Tqy6UAn9ShClyvfUon001g',
    },
    tile_size: 512,
    max_zoom: 16,
    rasters: ['terrain-normals'],
  },
}

function createSources(aktivKode) {
  console.log(aktivKode)
  return sources
}

export { createSources }
