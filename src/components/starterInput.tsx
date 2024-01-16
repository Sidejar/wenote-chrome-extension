import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Box, TextField } from '@radix-ui/themes'
import React from 'react'

const StarterInput = ({ setStap }) => {
  return (
    <Box className="">
      <TextField.Root className=" !outline-inherit !border-0 ">
        <TextField.Input
          placeholder="Add a comment"
          className="!text-sm !font-normal
         !border-0 !p-0 "
        />
        <TextField.Slot
          className="cursor-pointer bg-[#0144ff0f]"
          onClick={() => setStap(2)}
        >
          <ArrowUpIcon width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  )
}

export default StarterInput
