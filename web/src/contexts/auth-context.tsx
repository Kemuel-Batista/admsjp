'use client'

import { createContext, useContext, useMemo, useState } from 'react'

import { deleteCookie, setCookie } from 'cookies-next'
import { api } from '@/lib/api'

export type User = {
  id: number | null
  username: string
  name: string
  status: number | null
  profileId: number
}

type SignInCredentials = {
  username: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  getMe: () => void
  user: User
  isAuthenticated: boolean
}

export const signOut = () => {
  const win: Window = window
  deleteCookie('nextauth.token')
  deleteCookie('nextauth.refreshToken')
  win.location = '/login'
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: null,
    username: '',
    name: '',
    status: null,
    profileId: 0,
  })

  const isAuthenticated = !!user

  const getMe = async () => {
    try {
      const me = await api.get('/me')
      const { id, username, name, status, profileId } = me.data
      setUser({ id, username, name, status, profileId })
    } catch (error) {
      signOut()
    }
  }

  const signIn = async ({ username, password }: SignInCredentials) => {
    const response = await api.post('/auth/session', {
      username,
      password,
    })

    const { token, refreshToken } = response.data

    setCookie('nextauth.token', token, {
      maxAge: 60 * 60, // 60 minutos
      path: '/',
    })

    setCookie('nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60, // 60 minutos
      path: '/',
    })

    return response.data
  }

  const contextBag = useMemo(
    () => ({
      signIn,
      signOut,
      getMe,
      isAuthenticated,
      user,
    }),
    [signIn, signOut, getMe, isAuthenticated, user],
  )

  return (
    <AuthContext.Provider value={contextBag}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
