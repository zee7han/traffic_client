import axios from 'axios'
import conf from './config'

class APIService {

  constructor(host) {
    this.instance = axios.create({baseURL: `${host}`, timeout: conf['api_timeout']})
  }

  get(endpoint) {
    return this.instance.get(endpoint)
  }

  post(endpoint, data) {
    return this.instance.post(endpoint, data)
  }

  patch(endpoint, data) {
    return this.instance.patch(endpoint, data)
  }

  put(endpoint, data) {
    return this.instance.put(endpoint, data)
  }

  delete(endpoint, data) {
    return this.instance.delete(endpoint, data)
  }
}

const host = conf['host']

const api_service = new APIService(host)
export default api_service