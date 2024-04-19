import axios, { AxiosError } from 'axios'
import { signOut } from '@/contexts/auth-context'
import { setCookie, getCookies } from 'cookies-next'

let isRefreshing = false
let failedRequestQueue: any = []

export const setupAPIClient = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Accept-Language': i18n.language,
    },
  })

  api.interceptors.request.use(
    async (config) => {
      const { 'nextauth.token': token } = getCookies()
      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    (error) => Promise.reject(error),
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'user.auth.token.invalid') {
          const { 'nextauth.refreshToken': refreshToken } = getCookies()

          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/auth/refresh-token', {
                token: refreshToken,
              })
              .then((response) => {
                const { token, refreshToken } = response.data

                setCookie('nextauth.token', token, {
                  maxAge: 60 * 60, // 60 minutos
                  path: '/',
                })

                setCookie('nextauth.refreshToken', refreshToken, {
                  maxAge: 60 * 60, // 60 minutos
                  path: '/',
                })

                api.defaults.headers.common.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach((request: any) => {
                  request.onSuccess(token)
                })
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request: any) =>
                  request.onFailure(err),
                )
                failedRequestQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        }

        if (error.response.data?.message === 'Access Denied') {
          return Promise.reject(error)
        }

        if (process.browser) {
          signOut()
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('erro')
        }
      }
      return Promise.reject(error)
    },
  )

  return api
}
