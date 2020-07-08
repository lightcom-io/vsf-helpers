import queryString from 'query-string'
import {
  isNumeric,
  cleanUrl
} from '../utils'

export default class Imgix {
  constructor (url, defaults = {}) {
    Object.assign(this, { url, defaults })
  }

  getParams (params) {
    return Object.assign({}, this.defaults, params)
  }

  resolve (path, params = {}) {
    if (!path && !isNumeric(path)) return null

    const query = queryString.stringify(this.getParams(params))

    return cleanUrl(`${this.url}${path}` + (query ? `?${query}` : ''))
  }

  static setupEndpoints (config) {
    if (!config) throw new ReferenceError('Missing config for imgix.')

    for (const [tag, { url, defaults = {} }] of Object.entries(config)) {
      Imgix.endpoints[tag] = new Imgix(url, defaults)
    }
  }

  static resolveTag (path, params = {}, tag = 'default') {
    return Imgix.getEndpoint(tag).resolve(path, params)
  }

  static getEndpoint (tag) {
    if (!(tag in Imgix.endpoints)) throw new ReferenceError(`Could not find imgix config for tag '${tag}'.`)

    return Imgix.endpoints[tag]
  }
}

Imgix.endpoints = {}
