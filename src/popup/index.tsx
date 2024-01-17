import { Theme, Button } from '@radix-ui/themes'
import React, { useCallback } from 'react'

import { useFirebase } from '~hook/useFirebase'

const Popup = () => {
  const { user } = useFirebase()

  console.log(user)
  const handleAdd = useCallback(async () => {}, [])

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
