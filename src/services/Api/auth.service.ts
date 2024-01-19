import { type AxiosInstance } from 'axios'
import type { IUser } from '~models'

export class AuthService {
  constructor(private instance: AxiosInstance) {}

  googleLogin(token: string) {
    return this.instance
      .post<{
        token: string
        user: IUser
      }>('/auth/google-connect', { token })
      .then((response) => response.data)
  }
}
