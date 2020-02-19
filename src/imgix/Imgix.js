import queryString from 'query-string'

export default class Imgix {
  constructor (url, defaults = {}) {
    Object.assign(this, { url, defaults })
  }

  getParams (params) {
    return Object.assign({}, this.defaults, params)
  }

  resolve (path, params = {}) {
    const query = queryString.stringify(this.getParams(params))

    return `${this.url}${path}` + (query ? `?${query}` : '')
  }

  static setupEndpoints (config) {
    if (!config) throw new ReferenceError('Missing config for imgix.')

    for (const [tag, { url, defaults = {} }] of Object.entries(config)) {
      Imgix.endpoints[tag] = new Imgix(url, defaults)
    }
  }

  static resolveTag (path, params = {}, tag = 'default') {
    const endpoint = Imgix.getEndpoint(tag)
    return endpoint.resolve(path, params)
  }

  static getEndpoint (tag) {
    if (!(tag in Imgix.endpoints)) throw new ReferenceError(`Could not find imgix config for tag '${tag}'.`)

    return Imgix.endpoints[tag]
  }
}

Imgix.endpoints = {}
