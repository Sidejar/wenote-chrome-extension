import { sendToContentScript } from '@plasmohq/messaging'
import { Button, Theme } from '@radix-ui/themes'
import React, { useCallback } from 'react'
import { useAuthContext } from '~contexts/auth'
import { useSocialLogin } from '~hook/useSocialLogin'

export const Popup: React.FC = () => {
  const { user } = useAuthContext()
  const { onGoogleLogin } = useSocialLogin()

  const handleAdd = useCallback(async () => {
    sendToContentScript({
      name: 'widget',
      body: user,
    })
  }, [user])

  return (
    <Theme>
      {!user && (
        <Button size="3" variant="soft" onClick={onGoogleLogin}>
          Login with Google
        </Button>
      )}
      {user && (
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
      )}
    </Theme>
  )
}
