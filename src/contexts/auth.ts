import { createContext, useContext } from 'react'
import type { IUser } from '~models'

export interface AuthContextInterface {
  user: IUser
  token: string
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

export const useAuthContext = (): AuthContextInterface => {
  return useContext(AuthContext)
}
