import './app.css'

type Props = {
  children: React.ReactNode
}

export const App = ({ children }: Props) => {
  return (
    <div className="app flex flex-col bg-gray-100 min-h-screen">{children}</div>
  )
}

export const AppHeader = ({ children }: Props) => {
  return <div className="app-header">{children}</div>
}

export const AppSidebar = ({ children }: Props) => {
  return <div className="app-sidebar">{children}</div>
}

export const AppNavbar = ({ children }: Props) => {
  return (
    <div className="app-navbar bg-white z-50 flex items-center px-8 py-3 border-b-2 border-gray-300">
      {children}
    </div>
  )
}

export const AppContent = ({ children }: Props) => {
  return <div className="app-content">{children}</div>
}

export const AppFooter = ({ children }: Props) => {
  return <div className="app-footer">{children}</div>
}

export const AppWrapper = ({ children }: Props) => {
  return <div className="app-wrapper">{children}</div>
}
