import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import React, { useState } from 'react'

const Comment = ({ conversation, setModalOpen }) => {
  const [activeConvo, setactiveConvo] = useState([])
  return (
    <Box className="w-full mb-[20px]">
      {conversation?.threads?.length > 0 && (
        <div className="bg-[#1b00fb] rounded-full w-[22px] h-[22px] mb-[16px] flex  justify-center text-[14px] items-center  text-white">
          {conversation?.threads?.length}
        </div>
      )}

      <Flex align="start" justify={'between'} className="!gap-2">
        <Flex align="start" className="!gap-2">
          <Avatar
            variant="solid"
            fallback="JF"
            className="!w-6 !h-6 !p-1 text-xs !font-medium !tracking-[0.04px] !text-white !bg-[#3E63DD] !rounded"
          />
          <Box>
            <Flex align="center" className="!gap-2 !mt-1 !mb-2">
              <Text size="1" weight="bold">
                {conversation?.username || 'raja'}
              </Text>
              <Text size="1" color="gray">
                23 min ago
              </Text>
            </Flex>

            <p
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: conversation?.title,
              }}
            ></p>
          </Box>
        </Flex>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="soft"
              className="!bg-white cursor-pointer"
              size="1"
            >
              <DotsHorizontalIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="2">
            <DropdownMenu.Item>Resolve</DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setModalOpen(true)
              }}
            >
              Create ticket
            </DropdownMenu.Item>
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
