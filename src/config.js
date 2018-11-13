const storageUrl =
  'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/'

class config {
  static feature = {
    comboSøk: false,
  }

  static createTileSource(relativePath, type, zoom, bbox) {
    const source = {
      filtering: 'nearest',
      type: type,
      url: `https://{s}.artsdatabanken.no/${relativePath}/{z}/{x}/{y}`,
      url_subdomains: ['maps'],
    }
    if (!bbox || !zoom) {
      console.warn(`No map extents for ${relativePath}`)
    }

    if (bbox) {
      const [ll, ur] = bbox
      source.bounds = [ll[1], ll[0], ur[1], ur[0]]
    }
    if (zoom) {
      source.min_zoom = zoom[0]
      source.max_zoom = zoom[1]
    }
    return source
  }

  static getFotoOmslag(
    kode: string,
    width: number = 408,
    filtype: string = 'jpg'
  ) {
    return `${storageUrl}bilde%2Fomslag%2F${width}%2F${_h(
      kode
    )}.${filtype}?alt=media`
  }

  static getFotoBanner(kode: string, width: number = 408) {
    return `${storageUrl}bilde%2Fbanner%2F${width}%2F${_h(kode)}.jpg?alt=media`
  }

  static avatar40px(kode: string, ext = 'jpg') {
    return `${storageUrl}bilde%2Favatar%2F40%2F${_h(kode)}.${ext}?alt=media`
  }

  static avatar24px(kode: string) {
    return `${storageUrl}bilde%2Favatar%2F24%2F${_h(kode)}.jpg?alt=media`
  }

  static metaUrl(kode: string) {
    kode = kode
      .replace('/katalog', '')
      .split('_')
      .join('-')
      .replace('LA_', 'LA-')
      .toUpperCase()
    if (kode.length <= 1) kode = '~'
    return `https://maps.artsdatabanken.no/metabase/meta/${kode}.json`
  }
}

function _h(kode) {
  return kode.replace('-', '_')
}

export default config
