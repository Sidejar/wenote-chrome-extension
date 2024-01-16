import { Theme, Button } from "@radix-ui/themes"
import React, { useCallback } from "react"

import "~assets/style.css"

const Popup = () => {
  const handleAdd = useCallback(() => {
    
  }, [])

  return (
    <div className="w-fit shadow-xl !rounded-2xl">
        <Theme className="!rounded-3xl">
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
        </Theme>
    </div>
  )
}

export default Popup
