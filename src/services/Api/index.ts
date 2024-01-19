import axios, { type AxiosInstance } from 'axios'
import { env } from '~env'
import { AuthService } from './auth.service'

export default class Api {
  client: AxiosInstance

  auth: AuthService

  constructor() {
    // build client
    this.client = axios.create({
      baseURL: env.apiHost,
    })

    this.auth = new AuthService(this.client)
  }
}
