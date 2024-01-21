import React from 'react'
import type { PlasmoGetStyle } from 'plasmo'
import type { PlasmoGetOverlayAnchor } from 'plasmo'

import '~components/csui/styles.scss'
import '@radix-ui/themes/styles.css'

import styles from 'data-text:~components/csui/styles.scss'
import radixStyles from 'data-text:@radix-ui/themes/styles.css'
import { CSUI } from '~components/csui'
import { useMessage } from '@plasmohq/messaging/hook'
import { AuthContext } from '~contexts/auth'
import type { IUser } from '~models'
import { useStorage } from '@plasmohq/storage/hook'

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style')
  style.textContent = `${radixStyles} ${styles}`
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () => document.body

const Root = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')

  if (user) return null

  return (
    <AuthContext.Provider value={{ user, token }}>
      <CSUI />
    </AuthContext.Provider>
  )
}

export default Root
