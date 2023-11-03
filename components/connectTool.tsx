import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes"
import React from "react"

const ConnectTool = ({ cta }) => {
  return (
    <Box className="w-[400px] h-auto p-6 bg-white rounded-xl shadow border border-slate-900 border-opacity-5 ">
      <Heading size="5" className="!text-neutral-800 ">
        Connect tool
      </Heading>
      <Text as="p" size="2" className="!text-neutral-800 !mt-3 !mb-4">
        Whoops, you don’t have any Project Management tool connected. Connect
        Project Management tool first.
      </Text>

      <Flex justify="end" align="center" className="!gap-3 w-full">
        <Button className="!h-8 !cursor-pointer !px-3 !text-sm !font-medium !text-[#60646C] !bg-slate-900 !bg-opacity-5 !rounded justify-center items-center gap-2 inline-flex">
          Cancel
        </Button>
        <Button
          className="!h-8 !px-3 !text-sm !cursor-pointer !font-medium !text-white  !bg-opacity-5 !rounded justify-center items-center gap-2 inline-flex"
          onClick={cta}>
          Connect
        </Button>
      </Flex>
    </Box>
  )
}

export default ConnectTool
