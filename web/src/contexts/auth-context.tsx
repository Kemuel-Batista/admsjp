'use client'

import { deleteCookie, getCookie } from 'cookies-next'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { api } from '@/lib/axios'

type SignInCredentials = {
  email: string
  password: string
}

export type User = {
  id: number | null
  email: string
  name: string
  photo: string
  status: number | null
  roles: string[]
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  getMe: () => void
  user: User
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = getCookie('nextauth_token')

  const [user, setUser] = useState<User>({
    id: null,
    email: '',
    name: '',
    photo: '',
    status: null,
    roles: [],
  })

  const isAuthenticated = user.id !== null

  const signOut = async () => {
    deleteCookie('nextauth_token')

    await api.post('/auth/sessions/logout')
    setUser({
      id: null,
      email: '',
      name: '',
      photo: '',
      status: null,
      roles: [],
    })
  }

  const getMe = async () => {
    try {
      const me = await api.get('/me')
      const { id, email, name, photo, status, roles } = me.data.user
      setUser({ id, email, name, photo, status, roles })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMe()
  }, [token])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    await api.post(`/auth/session`, {
      email,
      password,
    })
  }, [])

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
