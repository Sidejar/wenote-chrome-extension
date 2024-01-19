import axios, { type AxiosInstance } from 'axios'
import { env } from '~env'

export default class Api {
  client: AxiosInstance

  constructor() {
    // build client
    this.client = axios.create({
      baseURL: env.apiHost,
    })
  }
}
