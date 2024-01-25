import React, { useEffect, useState } from 'react'
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
import { WidgetContext } from '~contexts/widget'
import type { CSUIEvent } from '~components/csui/types'

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style')
  style.textContent = `${radixStyles} ${styles} ${globalStyles}`
  return style
}

const Root = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')
  const [isWidgetVisible, setWidgetVisibility] = useState(false)

  const { data } = useMessage<{ event: CSUIEvent; time: number }, boolean>(
    async (req, res) => {
      res.send(true)
    },
  )

  useEffect(() => {
    if (data) {
      setWidgetVisibility(data.event === 'launchWidget')
    }
  }, [data])

  if (!user) return null
  if (!isWidgetVisible) return null

  return (
    <AuthContext.Provider value={{ user, token }}>
      <WidgetContext.Provider
        value={{
          isWidgetVisible,
          setWidgetVisible: (flag) => setWidgetVisibility(flag),
        }}
      >
        <CSUI />
      </WidgetContext.Provider>
    </AuthContext.Provider>
  )
}

export default Root
