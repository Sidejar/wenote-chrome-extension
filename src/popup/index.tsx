import { Theme, Button } from '@radix-ui/themes'
import React, { useCallback } from 'react'
import { sendToContentScript } from '@plasmohq/messaging'
import { useFirebase } from '~hook/useFirebase'
import { AuthContext } from '~contexts/auth'

const Popup = () => {
  const { user } = useFirebase()

  const handleAdd = useCallback(async () => {
    sendToContentScript({
      name: 'widget',
      body: user,
    })
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>
      <Theme>
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
      </Theme>
    </AuthContext.Provider>
  )
}

export default Popup
