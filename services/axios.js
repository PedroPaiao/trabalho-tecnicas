
  
import axios from 'axios'

const axiosClient = axios.create()
const BASE_URL = "https://pokeapi.co/api/v2/"

axiosClient.defaults.baseURL = `${BASE_URL}`
axiosClient.defaults.responseType = 'json'

// All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 5000

axiosClient.defaults.withCredentials = false

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error === undefined) {
      return Promise.reject(error)
    } else if (error.response.status > 199 && error.response.status < 500) {
      return error.response
    } else if (error.response.status === 401) {
      window.location.replace('http://gufra.app')
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosClient;