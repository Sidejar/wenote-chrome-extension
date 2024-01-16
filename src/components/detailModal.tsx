import { Box, Flex, Heading } from "@radix-ui/themes"
import React, { useState } from "react"

import Comment from "./comment"
import Header from "./header"
import StarterInput from "./starterInput"
import TextEditer from "./textEditer" 

const DetailModal = () => {
  const [stap, setStap] = useState(1)

  return (
    <>
      <Box className="">
        <Box className="!w-6 !h-6 rounded-tl-[46px] flex items-center justify-center rounded-tr-[46px] rounded-br-[46px] border border-solid border-[#E6EDFE] !bg-[#3E63DD]">
          <Heading as="h2" size="2" className="!text-[#FDFDFE]">
            1
          </Heading>
        </Box>
      </Box>

      <Box
        className={`${stap === 1 ? "w-[267px]" : "w-[300px]"} !bg-white ${
          stap === 1 ? "!p-0" : "!p-3"
        } !rounded-lg shadow-md`}>
        {stap === 3 && <Header setStap={setStap} />}
        {stap === 1 && <StarterInput setStap={setStap} />}
        {/* 
        {stap === 3 && (
          <Flex direction="column" className="w-full gap-6 !pt-3 !pb-8">
            <Comment />
            <Comment />
          </Flex>
        )} */}
        {stap === 2 || stap === 3 ? <TextEditer setStap={setStap} /> : ""}
      </Box>
    </>
  )
}

export default DetailModal
