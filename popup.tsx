import { Theme } from "@radix-ui/themes"
import { GoogleOAuthProvider } from "@react-oauth/google"
import axios from "axios"
import React, { useEffect, useState } from "react"

import MainWenote from "~components/mainWenote"
import { getCurrentTabUrl } from "~content/utils"
import { getMarkupDetails } from "~services/markup"

import "~assets/style.css"
import "@radix-ui/themes/styles.css"

function IndexPopup() {
  const [data, setData] = useState("")
  const [url, setUrl] = useState<string>("")
  const [allMarkup, setallMarkup] = useState([])
  const [loader, setloader] = useState(false)
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined")
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await getMarkupDetails(13)
      if (response?.status === 200) {
        setallMarkup(response?.data?.markups)
      } else {
        setallMarkup([])
      }
    })()
  }, [])

  return (
    <div className="w-fit shadow-xl !rounded-2xl">
      <GoogleOAuthProvider clientId="808916015221-gdgit9c0lg6tc9a25mcppq3mnn9lh572.apps.googleusercontent.com">
        <Theme className="!rounded-3xl">
          <MainWenote allMarkup={allMarkup} newMarkupUrl={url} />
        </Theme>
      </GoogleOAuthProvider>
    </div>
  )
}

export default IndexPopup
