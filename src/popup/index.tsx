import { Theme, Button } from '@radix-ui/themes'
import React, { useCallback } from 'react'
import { sendToContentScript } from '@plasmohq/messaging'
import { useFirebase } from '~hook/useFirebase'

const Popup = () => {
  const { user } = useFirebase()

  const handleAdd = useCallback(async () => {
    sendToContentScript({
      name: 'widget',
      body: user,
    })
  }, [user])

  return (
    <div className="w-fit shadow-xl !rounded-2xl">
      <Theme>
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
      </Theme>
    </div>
  )
}

export default Popup
