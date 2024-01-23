import type { AxiosInstance } from 'axios'
import type { INote } from '~models'

export class NotesService {
  constructor(private instance: AxiosInstance) {}

  saveNote = (data: FormData) =>
    this.instance.post(`/notes`, data).then((response) => response.data)

  getNote = (id: string) =>
    this.instance.get<INote>(`/notes/${id}`).then((response) => response.data)
}
