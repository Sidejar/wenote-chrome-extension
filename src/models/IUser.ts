import type { INote } from './INote'

export type IUser = {
  id: number

  googleId: string

  name: string

  email: string

  notes: INote[]

  createdAt: string
}
