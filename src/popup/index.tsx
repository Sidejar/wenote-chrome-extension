import React, { useCallback, useEffect, useState } from 'react'
import { AuthContext } from '~contexts/auth'
import { Popup } from '~components/popup'
import type { IUser } from '~models'
import { Storage } from '@plasmohq/storage'

const storage = new Storage()

const Root = () => {
  const [user, setUser] = useState<IUser>()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    storage.get<IUser>('user').then(setUser)
    storage.get('token').then(setToken)
  }, [])

  const handleUser = useCallback((user: IUser) => {
    storage.set('user', user)
    setUser(user)
  }, [])

  const handleToken = useCallback((token: string) => {
    storage.set('token', token)
    setToken(token)
  }, [])

  const handleLogout = useCallback(() => {
    setUser(undefined)
    setToken(undefined)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: handleUser,
        token,
        setToken: handleToken,
        logout: handleLogout,
      }}
    >
      <Popup />
    </AuthContext.Provider>
  )
}

export default Root
