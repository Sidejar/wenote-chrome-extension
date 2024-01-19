import { useCallback, useState } from 'react'
import useApi from './useApi'
import { useAuthContext } from '~contexts/auth'

export const useSocialLogin = () => {
  const { api } = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const { setToken, setUser } = useAuthContext()

  const onGoogleLogin = useCallback(() => {
    setIsLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      api.auth.googleLogin(token).then((response) => {
        setToken(response.token)
        setUser(response.user)
      })
    })
  }, [api, setToken, setUser])

  return {
    isLoading,
    onGoogleLogin,
  }
}
