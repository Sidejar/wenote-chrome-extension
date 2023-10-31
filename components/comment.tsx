import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import React from "react"

const Comment = ({ thread }) => {
  return (
    <Box className="w-full mb-[20px]">
      <Flex align="start" justify={"between"} className="!gap-2">
        <Flex align="start" className="!gap-2">
          <Avatar
            variant="solid"
            fallback="JF"
            className="!w-6 !h-6 !p-1 text-xs !font-medium !tracking-[0.04px] !text-white !bg-[#3E63DD] !rounded"
          />
          <Box>
            <Flex align="center" className="!gap-2 !mt-1 !mb-2">
              <Text size="1" weight="bold">
                {thread?.username}
              </Text>
              <Text size="1" color="gray">
                23 min ago
              </Text>
            </Flex>
            <Text as="div" size="2" className="!text-[#1C2024]">
              {thread?.text}
            </Text>
          </Box>
        </Flex>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="soft"
              className="!bg-white cursor-pointer"
              size="1">
              <DotsHorizontalIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="2">
            <DropdownMenu.Item>Resolve</DropdownMenu.Item>
            <DropdownMenu.Item>Create ticket</DropdownMenu.Item>
            <DropdownMenu.Item>Share</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>
  )
}

export default Comment
