import { Theme, Button } from '@radix-ui/themes'
import React, { useCallback } from 'react'
import { sendToContentScript } from '@plasmohq/messaging'
import { AuthContext } from '~contexts/auth'
import { useSocialLogin } from '~hook/useSocialLogin'

const Popup = () => {
  const { user, onGoogleLogin } = useSocialLogin()

  const handleAdd = useCallback(async () => {
    sendToContentScript({
      name: 'widget',
      body: user,
    })
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>
      <Theme>
        <Button size="3" variant="soft" onClick={onGoogleLogin}>
          Login with Google
        </Button>
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
      </Theme>
    </AuthContext.Provider>
  )
}

export default Popup
