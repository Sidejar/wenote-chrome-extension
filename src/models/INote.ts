import type { IUser } from './IUser'
import type { IWebsite } from './IWebsite'

export interface NotesMeta {
  position: number[]
  dimensions: number[]
  scroll: number[]
}

export type INote = {
  id: string

  url: string

  note: string

  screenshot: string

  status: number

  meta: NotesMeta

  user: IUser

  website?: IWebsite

  comments?: number

  createdAt: string

  updatedAt: string
}
