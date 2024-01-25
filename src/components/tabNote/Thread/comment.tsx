import React, { useMemo } from 'react'
import { Avatar, Button, Flex, Text } from '@radix-ui/themes'
import type { IComment } from '~models'
import { DateTime } from 'luxon'

export const Comment: React.FC<{ comment: IComment; isRoot?: boolean }> = ({
  comment,
  isRoot,
}) => {
  const initials = useMemo(() => {
    const parts = comment.user.name.trim().split(' ')
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`
    }
    return parts[0][0]
  }, [comment.user.name])

  return (
    <Flex gap="2" pb="5">
      <Avatar fallback={initials} size="1" variant="solid" />
      <Flex pt="1" direction="column" gap="1">
        <Flex align="center" grow="1" gap="2">
          <Text size="1" weight="bold">
            {comment.user.name}
          </Text>
          <Text size="1" color="gray">
            {DateTime.fromISO(comment.createdAt, { zone: 'UTC' }).toRelative()}
          </Text>
        </Flex>
        <Text size="2">{comment.comment}</Text>
        {isRoot && (
          <Flex pt="2" gap="2">
            <Button variant="surface">Share</Button>
            <Button variant="surface" color="gray">
              Create ticket
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
