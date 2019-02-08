var axios = require('axios')

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// API requests, all of them return a promise that
// redux-promise will handle

export const apiGet = (url, config) => api.get(url, config)

export const apiPut = (url, obj, config) => api.put(url, obj, config)

export const apiPost = (url, obj, config) => api.post(url, obj, config)

export const apiDelete = (url, params, config) => api.delete(url, params, config)

class Tasks {
  static Fetch () {
    return apiGet('task')
  }
  static Delete () {
    return apiDelete('task')
  }

  static Update (id, task) {
    return apiPut(`task/${id}`, task)
  }

  static Create (task) {
    return apiPost('task', task)
  }
}

export default {
  Tasks
}
