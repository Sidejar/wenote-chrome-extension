import { ChevronLeftIcon, DotFilledIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Link,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '~hook/useApi'
import type { LinkSummary } from '~services/Api/websites.service'
import { DateTime } from 'luxon'
import { generateShareUrl } from '~services/utils'

export const LinkDetails: React.FC = () => {
  const { api } = useApi()
  const navigate = useNavigate()
  const params = useParams()
  const [links, setLinks] = useState<LinkSummary[]>([])

  useEffect(() => {
    api.websites.getNotes(params.websiteId).then(setLinks)
  }, [api, params.websiteId])

  return (
    <div className="page details">
      <IconButton variant="soft" color="gray" onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
      </IconButton>
      <Flex align="center" justify="between" pt="5" pb="4">
        <Text size="2" weight="bold">
          {params.domain}
        </Text>
        <Badge size="1" variant="soft">
          {links.length}
        </Badge>
      </Flex>
      <ScrollArea className="list" scrollbars="vertical">
        {links.map((link) => (
          <Box pb="4">
            <Link
              href={generateShareUrl(link.id)}
              target="_blank"
              size="2"
              weight="regular"
              underline="always"
              className="title"
            >
              {link.note}
            </Link>
            <Flex align="center" pt="1" gap="2" className="meta">
              <Text size="1" weight="regular">
                {link.replies} {link.replies === '1' ? 'reply' : 'replies'}
              </Text>
              <DotFilledIcon className="dot" />
              <Text size="1" weight="regular">
                {DateTime.fromISO(link.createdAt).toLocaleString(
                  DateTime.DATE_SHORT,
                )}
              </Text>
            </Flex>
          </Box>
        ))}
      </ScrollArea>
    </div>
  )
}
