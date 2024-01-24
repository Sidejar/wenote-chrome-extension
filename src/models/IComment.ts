import type { INote } from './INote'
import type { IUser } from './IUser'

export type IComment = {
  id: number

  comment: string

  user: IUser

  note?: INote

  createdAt: string

  updatedAt: string
}
