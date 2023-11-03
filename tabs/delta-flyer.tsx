import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Box, Flex, Heading, Text, TextField, Theme } from "@radix-ui/themes"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

import "react-quill/dist/quill.snow.css"

import Comment from "~components/comment"
import CreateTicketModal from "~components/createTicketModal"
import DetailModal from "~components/detailModal"
import NoComment from "~components/noComments"
import TextEditer from "~components/textEditer"
import Threads from "~components/threads"

import "../assets/style.css"

export default function DeltaFlyerPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const parent = useRef()
  const iframeRef = useRef(null)
  const [markupdata, setMarkupdata] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [cord, setCord] = useState([])
  const [activeCord, setActiveCord] = useState<any>({})
  const [activeFeedback, setActiveFeedback] = useState<number>()
  const [isModalOpen, setModalOpen] = useState(false)

  const getAllCOnversationThreads = async () => {
    axios
      .get(`http://localhost:3001/v1/api/markup/${id}`)
      .then(function (response) {
        console.log("response", response)
        setMarkupdata(response?.data)
        setCord(response?.data?.conversations)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllCOnversationThreads()
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    console.log("iframeRef", iframeRef)
    if (iframe) {
      iframe.onload = () => {
        setLoading(false)
        console.log("Iframe content has loaded")
      }
    }
  }, [])
  console.log("co", cord)
  return (
    <Theme>
      {/* <DetailModal /> */}
      <Box>
        <Flex align="start" className="w-full h-full">
          <Box className="w-[366px]  h-screen  border-r border-solid border-gray-300">
            <Box className="flex justify-between py-[16px] px-[16px] border-b border-solid border-gray-300">
              <Heading size="2">Comments</Heading>
              <Box className="w-fit flex !h-5 px-2 rounded-[3px] py-[2px] !bg-[#00003b0d]">
                <Text className="!text-xs !font-bold !tracking-[0.04px] !text-[#00259ecc]">
                  {markupdata?.conversations?.length}
                </Text>
              </Box>
            </Box>
            <Box className="px-3">
              <Box className="py-[16px]">
                <TextField.Root className="h-[28px] flex items-center !rounded-none py-[20px]">
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                  <TextField.Input placeholder="Search the docs…" />
                </TextField.Root>
              </Box>
              {markupdata?.conversations?.length > 0 ? (
                <>
                  {markupdata?.conversations?.map((convo: any, key: number) => (
                    <Comment
                      key={key}
                      conversation={convo}
                      setModalOpen={setModalOpen}
                    />
                  ))}
                </>
              ) : (
                <NoComment />
              )}
            </Box>
          </Box>
          {true ? (
            <div className="w-full h-[30000px] relative" ref={parent}>
              <div
                className="w-full h-full absolute bg-['#3f83f824'] top-[0] left-[0]"
                onClick={(e) => {
                  const boxRect = parent.current.getBoundingClientRect()
                  if (e.target === e.currentTarget) {
                    setActiveFeedback(cord?.length)
                    setActiveCord({
                      isNew: true,
                      xCord: e.clientX - boxRect.left,
                      yCord: e.clientY - boxRect.top
                    })
                  }
                }}></div>
              {[...cord, activeCord]?.map((data, counter) => {
                const isNo = counter + 1
                return (
                  <div
                    key={counter}
                    className="flex justify-center bg-[#1b00fb] text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      // setActiveCord({})
                      setActiveFeedback(counter)
                    }}
                    style={{
                      borderRadius: "100%",
                      width: "30px",
                      height: "30px",
                      position: "absolute",
                      top: parseInt(data.yCord),
                      left: parseInt(data.xCord)
                    }}>
                    {isNo}
                    <div
                      className={`${
                        activeFeedback === counter ? "block" : "hidden"
                      } relative`}>
                      {Object.keys(data)?.length > 0 && !data?.isNew && (
                        <Threads
                          conversation={data}
                          getAllCOnversationThreads={getAllCOnversationThreads}
                        />
                      )}
                      {data?.isNew && (
                        <TextEditer
                          // value={data?.title}
                          activeCord={activeCord}
                          setActiveFeedback={setActiveFeedback}
                          markupId={id}
                          getAllCOnversationThreads={getAllCOnversationThreads}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
              <iframe
                ref={iframeRef}
                src={markupdata ? markupdata?.url : ""}
                width="100%" // Set width to 100% of parent element's width
                height="100%" // Set height to 100% of parent element's height
                style={{ border: "none" }} // Optional: Remove iframe border
                sandbox="allow-same-origin"></iframe>
            </div>
          ) : (
            <>
              <div className="flex  justify-center items-center">loading</div>
            </>
          )}
        </Flex>
      </Box>
      {isModalOpen && (
        <CreateTicketModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
      )}
    </Theme>
  )
}
