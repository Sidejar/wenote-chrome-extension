import { useCallback, useState } from 'react'

export const useSocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onGoogleLogin = useCallback(() => {
    console.log('google login')
    setIsLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      console.log(token)
    })
  }, [])

  return {
    user: {},
    isLoading,
    onGoogleLogin,
  }
}
