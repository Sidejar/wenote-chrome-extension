import { Theme, Button } from "@radix-ui/themes"
import React from "react"


import "~assets/style.css"
import "@radix-ui/themes/styles.css"
import { useFirebase } from "~hook/useFirebase"

const Popup = () => {
  const { onLogin, user } = useFirebase()

  console.log(user)

  return (
    <div className="w-fit shadow-xl !rounded-2xl">
        <Theme className="!rounded-3xl">
        <Button size="3" variant="soft" onClick={onLogin}>
          Login
        </Button>
        </Theme>
    </div>
  )
}

export default Popup
