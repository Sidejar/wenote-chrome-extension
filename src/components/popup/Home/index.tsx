import { useNavigate } from 'react-router-dom'
import { sendToContentScript } from '@plasmohq/messaging'
import React, { useCallback, useEffect, useState } from 'react'
import type { CSUIEvent } from '~components/csui/types'
import { useAuthContext } from '~contexts/auth'
import useApi from '~hook/useApi'
import { useSocialLogin } from '~hook/useSocialLogin'
import type { Summary } from '~services/Api/notes.service'
import { DateTime } from 'luxon'
import { Badge, Button, Flex, Link, ScrollArea, Text } from '@radix-ui/themes'

export const Home: React.FC = () => {
  const { api } = useApi()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { onGoogleLogin, isLoading } = useSocialLogin()
  const [summary, setSummary] = useState<Summary[]>()

  useEffect(() => {
    user && api.notes.getSummary().then(setSummary)
  }, [api, user])

  const handleAdd = useCallback(async () => {
    sendToContentScript<{ event: CSUIEvent; time: number }>({
      name: 'widget',
      body: {
        event: 'launchWidget',
        time: DateTime.now(),
      },
    })
    window.close()
  }, [])
  return (
    <>
      {!user && (
        <Button
          size="3"
          variant="surface"
          onClick={onGoogleLogin}
          className="cta"
          disabled={isLoading}
        >
          Login with Google
        </Button>
      )}
      {user && (
        <Button size="3" onClick={handleAdd} className="cta">
          Create Note
        </Button>
      )}
      {user && (
        <Flex direction="column" gap="4" className="page">
          <Text size="2" weight="bold">
            History
          </Text>
          <ScrollArea className="list">
            {summary?.map((s) => (
              <Flex
                key={s.name}
                align="center"
                justify="between"
                pb="4"
                onClick={() => navigate(`/details/${s.id}/${s.name}`)}
              >
                <Link size="2" weight="regular" underline="always">
                  {s.name}
                </Link>
                <Badge size="1" variant="soft">
                  {s.count}
                </Badge>
              </Flex>
            ))}
          </ScrollArea>
        </Flex>
      )}
    </>
  )
}
