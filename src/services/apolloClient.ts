import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { getToken } from './auth'

const { API_URL: API_URL_DEFAULT, API_URL_LOCALHOST, REPORTS_URL } = process.env
const API_URL = (window.location.hostname === 'localhost' && API_URL_LOCALHOST) || API_URL_DEFAULT

const networkInterface = createNetworkInterface({
  uri: API_URL,
})

console.debug('config', { API_URL, API_URL_DEFAULT, API_URL_LOCALHOST, REPORTS_URL })

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }
      req.options.headers.Authorization = 'Bearer ' + getToken()
      next()
    },
  },
])

const client = new ApolloClient({
  networkInterface,
})

export default client
