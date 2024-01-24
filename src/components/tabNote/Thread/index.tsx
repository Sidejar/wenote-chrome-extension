import React, { forwardRef } from 'react'
import type { Props } from './types'
import { motion } from 'framer-motion'
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  ScrollArea,
  Separator,
  Text,
} from '@radix-ui/themes'
import {
  CheckCircledIcon,
  Cross2Icon,
  FilePlusIcon,
  Share2Icon,
} from '@radix-ui/react-icons'

export const Thread: React.FC = forwardRef<HTMLDivElement, Props>(
  ({ note, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, marginTop: -8 }}
        animate={{ opacity: 1, marginTop: 0 }}
        exit={{ opacity: 0, marginTop: 8 }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        className="thread"
        {...rest}
      >
        <div className="topbar">
          <IconButton variant="ghost">
            <CheckCircledIcon width={16} height={16} />
          </IconButton>
          <Flex gap="3">
            <IconButton variant="ghost" color="gray">
              <FilePlusIcon width={16} height={16} />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <Share2Icon width={16} height={16} />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <Cross2Icon width={16} height={16} />
            </IconButton>
          </Flex>
        </div>
        <Separator size="4" />
        <ScrollArea className="list">
          <Flex gap="2" pb="5">
            <Avatar fallback="TH" size="1" variant="solid" />
            <Flex pt="1" direction="column" gap="1">
              <Flex align="center" grow="1" gap="2">
                <Text size="1" weight="bold">
                  {note.user.name}
                </Text>
                <Text size="1" color="gray">
                  23 min ago
                </Text>
              </Flex>
              <Text size="2">{note.note}</Text>
              <Flex pt="2" gap="2">
                <Button variant="surface">Share</Button>
                <Button variant="surface" color="gray">
                  Create ticket
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ScrollArea>
      </motion.div>
    )
  },
)
