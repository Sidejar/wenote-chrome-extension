import React, { useCallback } from 'react'
import { AuthContext } from '~contexts/auth'
import { Popup } from '~components/popup'
import type { IUser } from '~models'
import { useStorage } from '@plasmohq/storage/hook'
import '@radix-ui/themes/styles.css'

const Root = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')

  const handleLogout = useCallback(() => {
    // setUser(undefined)
    // setToken(undefined)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout: handleLogout,
      }}
    >
      <Popup />
    </AuthContext.Provider>
  )
}

export default Root
