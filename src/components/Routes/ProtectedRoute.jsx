import React from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../userContext/userContext'

function ProtectedRoute({children, isAllowed=false, redirectedPath='/signin'}) {
     const {user} = useAuth()
  
          return isAllowed ? children  :  <Navigate to={redirectedPath} replace/> 

}

export default ProtectedRoute