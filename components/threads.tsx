import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import axios from "axios"
import React, { useState } from "react"
import ReactQuill from "react-quill"

import { createConversationThreads } from "~services/markup"

const Threads = ({ conversation, getAllCOnversationThreads }) => {
  const [reply, setReply] = useState("")
  return (
    <Box className="w-full absolute mb-[20px] min-w-[350px] min-h-[98px]  rounded-[4px] !p-[10px] !top-[38] bg-[#eddfdf]">
      <Flex
        align="start"
        justify={"between"}
        dir="column"
        className="!gap-2 !flex-col">
        <Flex align="start" className="!gap-2">
          <Box>
            <Flex align="center" className="!gap-2 !mt-1 !mb-2">
              <Text size="1" weight="bold">
                {conversation?.username || "raja"}
              </Text>
              <Text size="1" color="gray">
                23 min ago
              </Text>
            </Flex>
            <p
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: conversation?.title
              }}></p>
          </Box>
        </Flex>
        {conversation?.threads?.map((thread: any, index: number) => (
          <Flex align="start" className="!gap-2" key={index}>
            <Box>
              <Flex align="center" className="!gap-2 !mt-1 !mb-2">
                <Text size="2" weight="bold" className="!text-black">
                  {thread?.username || "raja"}
                </Text>
                <Text size="1" color="gray">
                  23 min ago
                </Text>
              </Flex>
              <p
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: thread?.text
                }}></p>
            </Box>
          </Flex>
        ))}

        <Box className="w-full min-h-[70px]">
          <form
            className="w-full h-[30px] border border-solid border-[#01012e21] p-[6px]"
            onSubmit={async (e) => {
              e.preventDefault()
              const payload = {
                text: reply,
                seriesNo: 0,
                username: "raja",
                status: "active"
              }
              const response = await createConversationThreads(
                conversation?.id,
                payload
              )
              if (response?.status === 201) {
                getAllCOnversationThreads()
                setReply("")
              } else {
                // setallMarkup([])
              }
            }}>
            <ReactQuill
              className="w-full"
              value={reply}
              onChange={(e) => {
                setReply(e)
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
              Reply
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default Threads
