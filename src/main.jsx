import React from 'react'
import ReactDOM from 'react-dom/client'
import AppUI from './app'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppUI />
  },
  {
    path: '/tommorow',
    element: <AppUI />
  },
  {
    path: '/dayaftertommorow',
    element: <AppUI />
  },

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)



