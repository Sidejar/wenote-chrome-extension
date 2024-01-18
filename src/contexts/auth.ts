import type { User } from 'firebase/auth'
import { createContext, useContext } from 'react'

export interface AuthContextInterface {
  user: User
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

export const useAuthContext = (): AuthContextInterface => {
  return useContext(AuthContext)
}
