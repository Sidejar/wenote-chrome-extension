import type { AxiosInstance } from 'axios'

export interface NoteSummary {
  id: string
  replies: string
  note: string
  url: string
  createdAt: string
}

export class WebsitesService {
  constructor(private instance: AxiosInstance) {}

  getNotes = (id: number) =>
    this.instance
      .get<NoteSummary[]>(`/websites/${id}/notes`)
      .then((response) => response.data)
}
