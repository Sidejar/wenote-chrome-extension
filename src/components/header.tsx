import {
  CheckCircledIcon,
  Cross2Icon,
  FilePlusIcon,
  Share2Icon,
} from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import React from 'react'

const Header = ({ setStap }) => {
  return (
    <Flex
      justify="between"
      gap="3"
      align="center"
      className="w-full !pb-3 border-b border-solid border-[#EBEBEF]"
    >
      <Button variant="soft" className="!p-0 !w-6 !h-6 !cursor-pointer">
        <CheckCircledIcon width="20" height="20" />
      </Button>

      <Flex align="center" className="flex !gap-[6px]">
        <Button variant="soft" className="!p-0 !w-6 !h-6 !cursor-pointer">
          <FilePlusIcon width="20" height="20" />
        </Button>
        <Button variant="soft" className="!p-0 !w-6 !h-6 !cursor-pointer">
          <Share2Icon width="20" height="20" />
        </Button>
        <Button
          onClick={() => setStap(1)}
          variant="soft"
          className="!p-0 !w-6 !h-6 !cursor-pointer"
        >
          <Cross2Icon width="20" height="20" />
        </Button>
      </Flex>
    </Flex>
  )
}

export default Header
