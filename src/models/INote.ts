import type { IUser } from './IUser'
import type { IWebsite } from './IWebsite'

export type INote = {
  id: string

  url: string

  note: string

  screenshot: string

  status: number

  meta: object

  user: IUser

  website: IWebsite

  createdAt: string

  updatedAt: string
}
