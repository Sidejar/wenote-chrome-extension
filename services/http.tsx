import axios from "axios"

const baseURL = "http://localhost:3001/v1/api"
// process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION

const http = axios.create({ baseURL: `${baseURL}/` })

function getAuthHeader() {
  const accessToken = localStorage.getItem("hema-token")
  let authHeader: any = { "Content-Type": "application/json" }
  if (accessToken) {
    authHeader = { Authorization: `Bearer ${accessToken}` }
  }
  return authHeader
}
function getBlob(url: string, headers = {}, params = {}, signal = {}) {
  return http.get(url, {
    responseType: "blob",
    headers: { ...getAuthHeader(), ...headers }
  })
}

function get(url: string, headers = {}, params = {}, signal = null) {
  return http.get(url, {
    params,
    signal,
    headers: { ...getAuthHeader(), ...headers }
  })
}

function post(url: string, data: any, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers }
  })
}

function put(url: string, data: any, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } })
}

function remove(url: string, data: any, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data
  })
}

export { http, get, post, put, remove, getBlob }
