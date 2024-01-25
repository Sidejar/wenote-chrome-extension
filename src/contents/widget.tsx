import React from 'react'
import type { PlasmoGetStyle } from 'plasmo'

import '~components/csui/styles.scss'
import '~components/global.scss'
import '@radix-ui/themes/styles.css'

import globalStyles from 'data-text:~components/global.scss'
import styles from 'data-text:~components/csui/styles.scss'
import radixStyles from 'data-text:@radix-ui/themes/styles.css'
import { CSUI } from '~components/csui'
import { AuthContext } from '~contexts/auth'
import type { IUser } from '~models'
import { useStorage } from '@plasmohq/storage/hook'
import { useMessage } from '@plasmohq/messaging/hook'

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style')
  style.textContent = `${radixStyles} ${styles} ${globalStyles}`
  return style
}

const Root = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')

  const { data } = useMessage<boolean, boolean>(async (req, res) => {
    res.send(true)
  })

  if (!user) return null
  if (!data) return null

  return (
    <AuthContext.Provider value={{ user, token }}>
      <CSUI />
    </AuthContext.Provider>
  )
}

export default Root
