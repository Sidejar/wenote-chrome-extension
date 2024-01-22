import type { AxiosInstance } from 'axios'

export interface NotesMeta {
  position: number[]
  dimensions: number[]
  scroll: number[]
}

export class NotesService {
  constructor(private instance: AxiosInstance) {}

  saveNote = (data: FormData) =>
    this.instance.post(`/notes`, data).then((response) => response.data)
}
