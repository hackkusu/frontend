import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"
import { getLoggedInUser } from "./fakebackend_helper"


//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = ""

const axiosApi = axios.create({
  baseURL: API_URL,
})

// axiosApi.defaults.headers.common["Authorization"] = token

// Add a request interceptor
axiosApi.interceptors.request.use(function (config) {
  config.headers.Authorization = 'token ' + getLoggedInUser()?.key
  return config;
});

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
