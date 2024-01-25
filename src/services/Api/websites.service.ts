import type { AxiosInstance } from 'axios'

export interface LinkSummary {
  id: string
  replies: string
  note: string
  url: string
  createdAt: string
}

export class WebsitesService {
  constructor(private instance: AxiosInstance) {}

  getNotes = (id: string) =>
    this.instance
      .get<LinkSummary[]>(`/websites/${id}/notes`)
      .then((response) => response.data)
}
