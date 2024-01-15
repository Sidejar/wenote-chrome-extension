import { CrumpledPaperIcon } from "@radix-ui/react-icons"
import { Box, Flex, Heading, Text } from "@radix-ui/themes"
import React, { useState } from "react"

const NoComment = () => {
  const [stap, setStap] = useState(1)

  return (
    <>
      <Box className=" flex flex-col items-start justify-between mt-[40px]">
        <CrumpledPaperIcon height="24" width="24" />
        <Heading size="2" className="pt-[16px] pb-[6px]">
          There’s no comments yet.
        </Heading>
        <Text size="2" className=" ">
          Leave a comment on a website and it will appear here.
        </Text>
      </Box>
    </>
  )
}

export default NoComment
