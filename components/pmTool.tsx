import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes"
import React from "react"

import Asana from "../assets/images/Asana.png"
import Jira from "../assets/images/jira.png"
import Linear from "../assets/images/Linear.png"
import Notion from "../assets/images/Notion.png"

const PmTool = () => {
  return (
    <Box className="w-[400px] h-auto p-6 bg-white rounded-xl shadow border border-slate-900 border-opacity-5 ">
      <Heading size="5" className="!text-neutral-800 !mb-4">
        Select PM tool to connect
      </Heading>
      <Flex align="start" direction="column" className="!gap-6 !pb-12 w-full">
        <Flex justify="between" align="center" className="!gap-3 w-full">
          <Flex align="center" className="gap-3">
            <img src={Jira} alt="Jira" />
            <Text as="p" size="2" className=" !text-[#00259ecc]">
              Jira
            </Text>
          </Flex>

          <Button
            variant="outline"
            className="!h-8 !px-3 !text-sm !cursor-pointer !font-medium !text-[#00259ecc]  !rounded justify-center items-center gap-2 inline-flex">
            Connect
          </Button>
        </Flex>
        <Flex justify="between" align="center" className="!gap-3 w-full">
          <Flex align="center" className="gap-3">
            <img src={Asana} alt="Jira" />
            <Text as="p" size="2" className=" !text-[#101D46]">
              Asana
            </Text>
          </Flex>
          <Text as="p" weight="bold" size="1" className=" !text-[#60646C]">
            coming soon
          </Text>
        </Flex>

        <Flex justify="between" align="center" className="!gap-3 w-full">
          <Flex align="center" className="gap-3">
            <img src={Notion} alt="Jira" />
            <Text as="p" size="2" className=" !text-[#101D46]">
              Notion
            </Text>
          </Flex>
          <Text as="p" weight="bold" size="1" className=" !text-[#60646C]">
            coming soon
          </Text>
        </Flex>

        <Flex justify="between" align="center" className="!gap-3 w-full">
          <Flex align="center" className="gap-3">
            <img src={Linear} alt="Jira" />
            <Text as="p" size="2" className=" !text-[#101D46]">
              Linear
            </Text>
          </Flex>
          <Text as="p" weight="bold" size="1" className=" !text-[#60646C]">
            coming soon
          </Text>
        </Flex>
      </Flex>

      <Flex justify="end" align="center" className="!gap-3 w-full">
        <Button className="!h-8 !cursor-pointer !px-3 !text-sm !font-medium !text-[#60646C] !bg-slate-900 !bg-opacity-5 !rounded justify-center items-center gap-2 inline-flex">
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}

export default PmTool
