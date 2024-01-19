import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import Api from '~/services/Api'
import { useAuthContext } from '~contexts/auth'

type API_STATUS =
  | 'default'
  | 'loading'
  | 'loaded'
  | 'posting'
  | 'posted'
  | 'deleting'
  | 'deleted'

interface ApiError {
  statusCode: number
  message?: string | string[]
  response?: { message: string | string[] }
  error: string
}

export default function useApi() {
  const api = useMemo(() => new Api(), [])
  const { token, logout } = useAuthContext()
  const [status, setStatus] = useState<API_STATUS>('default')
  const [error, setError] = useState<string | null>(null)

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      setError(null)
      if (config.method === 'get') setStatus('loading')
      if (
        config.method === 'post' ||
        config.method === 'put' ||
        config.method === 'patch'
      )
        setStatus('posting')
      if (config.method === 'delete') setStatus('deleting')

      const newConfig = { ...config }
      newConfig.headers &&
        token &&
        (newConfig.headers.Authorization = `Bearer ${token}`)

      return { ...newConfig }
    },
    [token],
  )

  const responseInterceptor = useCallback((response: AxiosResponse) => {
    const { config } = response
    if (config.method === 'get') setStatus('loaded')
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'patch'
    )
      setStatus('posted')
    if (config.method === 'delete') setStatus('deleted')
    return response
  }, [])

  const errorInterceptor = useCallback((error: AxiosError<ApiError>) => {
    const statusCode = error.response?.status

    if (statusCode === 401) {
      return logout()
    }

    const errorMessages =
      error.response?.data?.message || error.response?.data?.response?.message
    if (errorMessages) {
      // API error
      const message = Array.isArray(errorMessages)
        ? errorMessages[0]
        : errorMessages

      setStatus('default')
      setError(message)
    } else {
      // Axios/Network errors
      const message = error.message

      setStatus('default')
      setError(message)
    }
    return Promise.reject(error)
  }, [])

  useEffect(() => {
    const requestRef = api.client.interceptors.request.use(requestInterceptor)

    const responseRef = api.client.interceptors.response.use(
      responseInterceptor,
      errorInterceptor,
    )

    return () => {
      api.client.interceptors.request.eject(requestRef)
      api.client.interceptors.response.eject(responseRef)
    }
  }, [api, requestInterceptor, responseInterceptor, errorInterceptor])

  return { api, status, error }
}
