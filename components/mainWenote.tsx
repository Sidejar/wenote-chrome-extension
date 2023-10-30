import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import React from "react"

import GoogleIcon from "../assets/images/google-logo.svg"
import WenoteLogo from "../assets/images/wenote-logo.svg"

const MainWenote = () => {
  return (
    <Card className="w-[300px] !bg-white !p-3   border border-solid border-[#01012e21] !rounded-xl ">
      <img
        src={WenoteLogo}
        alt="Wenote Logo"
        className="w-fit h-auto  object-contain mb-[27px]"
      />
      <Box className="!mb-[27px]">
        {false ? (
          <Button
            radius="small"
            variant="soft"
            className="w-full !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-[11px]  !text-sm !bg-white  !font-medium !text-[#0000008a] shadow-md">
            <img src={GoogleIcon} alt="google" width="18" height="18" /> Sign in
            with Google
          </Button>
        ) : (
          <Flex gap="3" align="center" justify="between">
            <Button
              radius="small"
              variant="soft"
              className="w-fit !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-1  !text-xs !font-medium !tracking-[0.04px] !text-[#00259ecc] !bg-[#0144ff0f] ">
              Integrations
            </Button>
            <Button
              radius="small"
              variant="soft"
              className="w-fit !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-1  !text-xs !font-medium !tracking-[0.04px] !text-[#60646C] !bg-[#00003b0d] ">
              Logout
            </Button>
          </Flex>
        )}
      </Box>
      <Flex direction="column" className="!gap-4">
        <Heading as="h2" size="2">
          History
        </Heading>
        {[1, 2, 3, 4, 5].map((item) => (
          <Flex
            key={item}
            gap="1"
            justify="between"
            onClick={() =>
              chrome.tabs.create({
                url: `./tabs/delta-flyer.html`
              })
            }>
            <Text className="!text-xs  !leading-5 !font-normal  !text-[#00259ecc] border-b border-solid border-[#023eeb26]">
              sitepoint.com
            </Text>
            <Box className="w-fit flex !h-5 px-2 rounded-[3px] py-[2px] bg-[#0144ff0f]">
              <Text className="!text-xs !font-medium !tracking-[0.04px] !text-[#00259ecc]">
                22
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}

export default MainWenote
