import type { AxiosInstance } from 'axios'
import type { INote, IComment } from '~models'

export class NotesService {
  constructor(private instance: AxiosInstance) {}

  saveNote = (data: FormData) =>
    this.instance.post(`/notes`, data).then((response) => response.data)

  getNote = (id: string) =>
    this.instance.get<INote>(`/notes/${id}`).then((response) => response.data)

  saveComment = (id: string, comment: string) =>
    this.instance
      .post<IComment>(`/notes/${id}/comments`, { comment })
      .then((response) => response.data)

  getComments = (id: string) =>
    this.instance
      .get<IComment[]>(`/notes/${id}/comments`)
      .then((response) => response.data)
}
