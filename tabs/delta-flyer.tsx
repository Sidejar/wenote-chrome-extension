import axios from "axios"
import { useParams } from "react-router-dom"

import "../assets/style.css"

import { useEffect, useRef, useState } from "react"

export default function DeltaFlyerPage() {
  const [markuUrl, setmarkuUrl] = useState()
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const [cord, setCord] = useState([])
  const [activeFeedback, setActiveFeedback] = useState<number>()
  useEffect(() => {
    axios
      .get(`http://localhost:3000/v1/api/markup/${id}`)
      .then(function (response) {
        console.log("response", response)
        setmarkuUrl(response?.data?.url)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  // useEffect(() => {
  //   const iframeContainer = document.getElementById(
  //     "markup-iframe"
  //   ) as HTMLIFrameElement

  //   if (iframeContainer) {
  //     iframeContainer.onload = () => {
  //       // Create a div element
  //       const div = document.createElement("div")
  //       div.style.position = "absolute"
  //       div.style.width = "200px" // Specify your desired width
  //       div.style.height = "100px" // Specify your desired height
  //       div.style.left = "50px"
  //       div.style.top = "50px"
  //       div.style.border = "1px solid black" // Optional: Add border for visualization
  //       div.style.zIndex = "999" // Specify your desired z-index value

  //       // Create an input element
  //       const input = document.createElement("input")
  //       input.type = "text"
  //       input.style.position = "absolute"
  //       input.style.width = "100%"
  //       input.style.height = "100%"
  //       input.style.border = "none" // Optional: Remove input border

  //       // Append the input to the div
  //       div.appendChild(input)

  //       // Append the div to the iframe content document body
  //       const iframeDocument =
  //         iframeContainer.contentDocument ||
  //         iframeContainer.contentWindow?.document
  //       if (iframeDocument) {
  //         iframeDocument.body.appendChild(div)
  //       }

  //       // Focus the input field after it is added to the document
  //       input.focus()

  //       // Optional: Remove the div and input after the input loses focus
  //       input.addEventListener("blur", () => {
  //         if (iframeDocument && iframeDocument.body.contains(div)) {
  //           iframeDocument.body.removeChild(div)
  //         }
  //       })
  //     }

  //     iframeContainer.onerror = (error) => {
  //       console.error("Error loading iframe content:", error)
  //     }
  //   } else {
  //     console.error("Iframe element not found.")
  //   }
  // }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "100vw", // Set width to 100% of viewport width
        height: "100vh" // Set height to 100% of viewport height
      }}>
      <h2>Welcome to the Dashboard</h2>
      <div
        className="flex"
        style={{
          height: "100%" // Set height to 100% of parent element's height
        }}>
        <div
          style={{
            zIndex: "9999" // Set height to 100% of parent element's height
          }}
          className="w-[200px]">
          <h2 className="text-[20px]">sidebar comment sections</h2>
        </div>
        <div className="w-full">
          <div
            className="w-full h-full"
            onClick={(e) => {
              console.log(e)
              setCord([...cord, { x: e.clientX, y: e.clientY }])
            }}>
            <div className="relative bg-transparent h-[100vh]"></div>
            {cord.map((data, counter) => {
              return (
                <div
                  onClick={() => {
                    setActiveFeedback(counter)
                  }}
                  style={{
                    background: "blue",
                    borderRadius: "100%",
                    width: "30px",
                    height: "30px",
                    position: "absolute",
                    top: data.y,
                    left: data.x
                  }}>
                  {counter + 1}
                  <div>
                    <input
                      className={`${
                        activeFeedback === counter ? "block" : "hidden"
                      } border solid`}
                      type="text"
                    />
                  </div>
                </div>
              )
            })}
            <iframe
              src={"https://www.postrank.io/"}
              width="100%" // Set width to 100% of parent element's width
              height="100%" // Set height to 100% of parent element's height
              style={{ border: "none" }} // Optional: Remove iframe border
            ></iframe>
          </div>
        </div>

        <div className="w-[320px] absolute right-0 ">
          <h2
            className="text-[20px]"
            // onClick={(e) => {
            //   console.log(e)
            // }}
          >
            jira task
          </h2>
        </div>
      </div>
    </div>
  )
}
