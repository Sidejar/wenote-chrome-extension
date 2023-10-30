import { Theme } from "@radix-ui/themes"
import axios from "axios"
import React, { useEffect, useState } from "react"

import MainWenote from "~components/mainWenote"
import { getCurrentTabUrl } from "~content/utils"

import "~assets/style.css"
import "@radix-ui/themes/styles.css"

function IndexPopup() {
  const [data, setData] = useState("")
  const [url, setUrl] = useState<string>("")
  const [loader, setloader] = useState(false)
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined")
    })
  }, [])
  console.log("url", url)
  return (
    <div className="w-fit shadow-xl !rounded-2xl">
      <Theme variant="" className="!rounded-3xl">
        <MainWenote />
        {/* chrome.tabs.create({
            url: `./tabs/delta-flyer.html`
          }) */}
      </Theme>
    </div>
  )
}

export default IndexPopup
