import React from 'react'
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo'
import type { PlasmoGetOverlayAnchor } from 'plasmo'

import '~components/csui/styles.scss'
import '@radix-ui/themes/styles.css'

import styles from 'data-text:~components/csui/styles.scss'
import radixStyles from 'data-text:@radix-ui/themes/styles.css'
import { CSUI } from '~components/csui'
import { useMessage } from '@plasmohq/messaging/hook'
import type { User } from 'firebase/auth'
import { AuthContext } from '~contexts/auth'

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style')
  style.textContent = `${radixStyles} ${styles}`
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () => document.body

const ContentUI = () => {
  const { data } = useMessage<User, User>((req, res) => {
    res.send(req.body)
  })

  if (!data) return null

  return (
    <AuthContext.Provider value={{ user: data }}>
      <CSUI />
    </AuthContext.Provider>
  )
}

export default ContentUI
