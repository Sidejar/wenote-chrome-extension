import { sendToContentScript } from '@plasmohq/messaging'
import {
  Badge,
  Button,
  Flex,
  Link,
  ScrollArea,
  Text,
  Theme,
} from '@radix-ui/themes'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '~contexts/auth'
import { useSocialLogin } from '~hook/useSocialLogin'
import logo from 'data-base64:~assets/images/wenote-logo.svg'
import type { Summary } from '~services/Api/notes.service'
import useApi from '~hook/useApi'
import type { CSUIEvent } from '~components/csui/types'
import { DateTime } from 'luxon'

export const Popup: React.FC = () => {
  const { api } = useApi()
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
    <Theme>
      <div className="popup">
        <img src={logo} />
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
          <Flex direction="column" gap="4" className="history">
            <Text size="2" weight="bold">
              History
            </Text>
            <ScrollArea>
              {summary?.map((s) => (
                <Flex key={s.name} align="center" justify="between" pb="4">
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
      </div>
    </Theme>
  )
}
