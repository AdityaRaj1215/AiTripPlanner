import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Header } from './components/custom/Header.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTrip } from './components/createtrip/index.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Viewtrip } from './viewtrip/[tripId]/index.jsx'
import { Mytrips } from './my-trips/Index.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/createtrip',
    element:<CreateTrip/>
  },
  {
    path:'/viewtrip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<Mytrips/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    
  </React.StrictMode>,
)
