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
  const [allMarkup, setallMarkup] = useState([])
  const [loader, setloader] = useState(false)
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined")
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      axios
        .get(`http://localhost:3001/v1/api/user/${9}/markup`)
        .then(function (response) {
          console.log("response", response)
          if (response?.status === 200) {
            setallMarkup(response?.data?.markups)
          } else {
            setallMarkup([])
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    })()
  }, [])

  console.log("url", url)
  return (
    <div className="w-fit shadow-xl !rounded-2xl">
      <Theme className="!rounded-3xl">
        <MainWenote allMarkup={allMarkup} newMarkupUrl={url} />
      </Theme>
    </div>
  )
}

export default IndexPopup
