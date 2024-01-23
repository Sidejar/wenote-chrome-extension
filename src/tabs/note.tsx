import React from 'react'
import '@radix-ui/themes/styles.css'
import '~components/tabNote/styles.scss'
import { useStorage } from '@plasmohq/storage/hook'
import type { IUser } from '~models'
import { AuthContext } from '~contexts/auth'
import { TabNote } from '~components/tabNote'

const SummaryTab = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')

  if (!user) return null

  return (
    <AuthContext.Provider value={{ user, token }}>
      <TabNote />
    </AuthContext.Provider>
  )
}

export default SummaryTab
