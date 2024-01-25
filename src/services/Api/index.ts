import axios, { type AxiosInstance } from 'axios'
import { env } from '~env'
import { AuthService } from './auth.service'
import { NotesService } from './notes.service'
import { WebsitesService } from './websites.service'

export default class Api {
  client: AxiosInstance

  auth: AuthService
  notes: NotesService
  websites: WebsitesService

  constructor() {
    // build client
    this.client = axios.create({
      baseURL: env.apiHost,
    })

    this.auth = new AuthService(this.client)
    this.notes = new NotesService(this.client)
    this.websites = new WebsitesService(this.client)
  }
}
