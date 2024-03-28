import { createBrowserRouter } from 'react-router-dom'

import { AdministratorAppLayout } from './pages/_layouts/administrator-app-layout'
import AuthLayout from './pages/_layouts/auth-layout'
import { AdministratorChurch } from './pages/administrators/churchs'
import { ChurchDetails } from './pages/administrators/churchs/details'
import { NewAdministratorChurch } from './pages/administrators/churchs/save'
import { AdministratorDashboard } from './pages/administrators/dashboard'
import { DepartmentList } from './pages/administrators/departments'
import { SaveDepartment } from './pages/administrators/departments/save'
import { Authenticate } from './pages/public/authenticate'
import { NewBeliever } from './pages/public/new-believer'
import { Register } from './pages/public/register'

export const routes = createBrowserRouter([
  {
    path: '/novo/convertido',
    element: <NewBeliever />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Authenticate />,
      },
      {
        path: '/signup',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <AdministratorAppLayout />,
    children: [
      {
        path: '/administrators/dashboard',
        element: <AdministratorDashboard />,
      },
      {
        path: '/administrators/church',
        element: <AdministratorChurch />,
      },
      {
        path: '/administrators/church/details',
        element: <ChurchDetails />,
      },
      {
        path: '/administrators/church/save',
        element: <NewAdministratorChurch />,
      },
      {
        path: '/administrators/departments',
        element: <DepartmentList />,
      },
      {
        path: '/administrators/departments/save',
        element: <SaveDepartment />,
      },
    ],
  },
])
