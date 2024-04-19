'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

const initialValues = {
  title: null,
  subtitle: null,
  sidebarCollapsed: true,
}

type AppContextProps = {
  title?: string | null
  setTitle?: any
  subtitle?: string | null
  setSubtitle?: any
  sidebarCollapsed?: boolean
  setSidebarCollapsed?: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext(initialValues as AppContextProps)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(
    initialValues.sidebarCollapsed,
  )
  const [title, setTitle] = useState<string | null>(null)
  const [subtitle, setSubtitle] = useState<string | null>(null)

  const contextBag = {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    sidebarCollapsed,
    setSidebarCollapsed,
  }

  return (
    <AppContext.Provider value={contextBag}>{children}</AppContext.Provider>
  )
}
