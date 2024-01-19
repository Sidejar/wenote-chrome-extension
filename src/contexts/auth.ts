import { createContext, useContext } from 'react'
import type { IUser } from '~models'

export interface AuthContextInterface {
  user?: IUser
  setUser: (user: IUser) => void
  token?: string
  setToken: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

export const useAuthContext = (): AuthContextInterface => {
  return useContext(AuthContext)
}
