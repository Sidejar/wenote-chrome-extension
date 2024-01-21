import { useCallback, useState } from 'react'
import useApi from './useApi'
import { Storage } from '@plasmohq/storage'
import { Constants } from '~constants'

const storage = new Storage()

export const useSocialLogin = () => {
  const { api } = useApi()
  const [isLoading, setIsLoading] = useState(false)

  const onGoogleLogin = useCallback(() => {
    setIsLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      api.auth.googleLogin(token).then((response) => {
        storage.set(Constants.storageToken, response.token)
        storage.set(Constants.storageUser, response.user)
      })
    })
  }, [api])

  return {
    isLoading,
    onGoogleLogin,
  }
}
