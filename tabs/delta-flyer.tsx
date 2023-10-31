import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Box, Flex, Heading, Text, TextField, Theme } from "@radix-ui/themes"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

import "react-quill/dist/quill.snow.css"

import Comment from "~components/comment"
import DetailModal from "~components/detailModal"
import NoComment from "~components/noComments"
import TextEditer from "~components/textEditer"

import "../assets/style.css"

export default function DeltaFlyerPage() {
  const [markupdata, setMarkupdata] = useState<any>()
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const [cord, setCord] = useState([])
  const [activeFeedback, setActiveFeedback] = useState<number>()
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/api/markup/${id}`)
      .then(function (response) {
        console.log("response", response)
        setMarkupdata(response?.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    if (markupdata?.conversation?.threads?.length) {
      setCord([...markupdata?.conversation?.threads])
    }
  }, [markupdata])

  console.log("cords", cord)
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
                  {markupdata?.conversation?.threads?.length}
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
              {markupdata?.conversation?.threads?.length > 0 ? (
                <>
                  {markupdata?.conversation?.threads?.map(
                    (thread: any, key: number) => <Comment thread={thread} />
                  )}
                </>
              ) : (
                <NoComment />
              )}
            </Box>
          </Box>

          <div className="w-full h-screen">
            <div
              className="w-full h-full relative"
              // style={{ padding: "100%" }}
              onClick={(e) => {
                console.log(e)
                if (e.target === e.currentTarget) {
                  setCord([...cord, { xCord: e.clientX, yCord: e.clientY }])
                }
              }}>
              {cord.map((data, counter) => {
                return (
                  <div
                    className=""
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveFeedback(counter)
                    }}
                    style={{
                      background: "blue",
                      borderRadius: "100%",
                      width: "30px",
                      height: "30px",
                      position: "absolute",
                      top: parseInt(data.yCord),
                      left: parseInt(data.xCord)
                    }}>
                    {data?.seriesNo}
                    <div
                      className={`${
                        activeFeedback === counter ? "block" : "hidden"
                      } w-[300px]`}>
                      <TextEditer value={data?.text} />
                    </div>
                  </div>
                )
              })}
              <iframe
                src={markupdata ? markupdata?.url : ""}
                width="100%" // Set width to 100% of parent element's width
                height="100%" // Set height to 100% of parent element's height
                style={{ border: "none" }} // Optional: Remove iframe border
              ></iframe>
            </div>
          </div>
        </Flex>
      </Box>
    </Theme>
  )
}
