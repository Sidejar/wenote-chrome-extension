import axios from "axios"
import React, { useEffect, useState } from "react"

import { getCurrentTabUrl } from "~content/utils"

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "400px"
      }}>
      <h2>
        Welcome to your <a href="#">MVP</a> Extension!
      </h2>

      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      <button
        onClick={() => {
          console.log("raja")

          setTimeout(() => {
            axios
              .post("http://localhost:3000/v1/api/markup", {
                url: url
              })
              .then(function (response) {
                setloader(false)
                chrome.tabs.create({
                  url: `./tabs/delta-flyer.html?id=${response?.data?.id}`
                })
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          }, 1000)
        }}>
        {loader ? "loading..." : "Create Markup:"}
      </button>
      <p>url:{url}</p>
      <button
        onClick={() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              const { id } = tabs[0]
              chrome.scripting.executeScript({
                target: { tabId: id },
                func: () => {
                  const iframe = document.createElement("iframe")
                  iframe.src = chrome.runtime.getURL("/tabs/delta-flyer.html")
                  iframe.name = "delta-flyer"
                  document.body.appendChild(iframe)
                }
              })
            }
          )
        }}>
        iframe mounting
      </button>
    </div>
  )
}

export default IndexPopup
