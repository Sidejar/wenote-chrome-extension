import { Box, Button, Flex, Text } from "@radix-ui/themes"
import axios from "axios"
import * as Emoji from "quill-emoji"
import React, { useEffect, useState } from "react"
import ReactQuill from "react-quill"

import Comment from "./comment"

import "quill-emoji/dist/quill-emoji.css"
import "react-quill/dist/quill.snow.css"

import { Quill } from "react-quill"

Quill.register("modules/emoji", Emoji)

const TextEditer = ({
  setActiveFeedback,
  markupId,
  getAllCOnversationThreads,
  activeCord
}) => {
  const [editorValue, seteditorValue] = useState("")

  const handleFormSubmit = async () => {
    const payload = {
      ...activeCord,
      title: editorValue,
      status: "active",
      username: "raja"
    }
    axios
      .post(`http://localhost:3001/api/v1/conversation/${markupId}`, payload)
      .then(function (response) {
        console.log("response", response)
        if (response?.status === 201) {
          setActiveFeedback()
          getAllCOnversationThreads()
          seteditorValue("")
        } else {
          // setallMarkup([])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div
      style={{ position: "absolute", top: "40px" }}
      className="absolute !top-[40px] z-index-[9999] bg-[#f5f6f7] w-[400px] border border-solid solid-gray-300">
      <form
        className=" w-full"
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit()
        }}>
        <ReactQuill
          className="w-full"
          value={editorValue}
          onChange={(e) => {
            seteditorValue(e)
          }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"]
            ]
          }}
          theme="snow"
        />
        <Button
          style={{ right: "5px", bottom: "12px" }}
          className="absolute !right-[5px] !bottom-[6px]"
          type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default TextEditer
