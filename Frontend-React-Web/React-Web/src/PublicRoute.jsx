import React from 'react'
import { useContext } from 'react'
import { Authcontext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const {isLoggedIn} = useContext(Authcontext)
  return !isLoggedIn ?(
    children
  ):(
    <Navigate to='/dashboard' />
  )
}

export default PublicRoute