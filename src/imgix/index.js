import Imgix from './Imgix'

export default {
  async install (Vue, options) {
    Imgix.setupEndpoints(options)

    Vue.prototype.$imgix = new Proxy(Imgix, {
      apply (target, thisArg, argumentsList) {
        return target.resolveTag.apply(target, argumentsList)
      },
      get (target, tag) {
        const endpoint = target.getEndpoint(tag)

        return endpoint.resolve.bind(endpoint)
      }
    })
  }
}
