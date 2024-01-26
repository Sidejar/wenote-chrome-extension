import React, { useEffect, useState } from 'react'

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
import { createRoot } from 'react-dom/client'

const Root: React.FC = () => {
  const [user] = useStorage<IUser>('user')
  const [token] = useStorage<string>('token')
  const [isWidgetVisible, setWidgetVisibility] = useState(true)

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

const body = document.querySelector('body')

const app = document.createElement('div')
app.id = 'wenote'

const style = document.createElement('style')
style.textContent = `${radixStyles} ${styles} ${globalStyles}`

if (body) {
  body.prepend(app)
  body.append(style)
}

const container = document.getElementById('wenote')
const root = createRoot(container!)
root.render(<Root />)
