import React, { createContext } from 'react'
import { useState , useContext } from 'react'

// create the context
const Authcontext= createContext()


const AuthProvider = ({children}) => {
    const [isLoggedIn , setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )
  return (
    <Authcontext.Provider value={{isLoggedIn, setIsLoggedIn}}>
       {children}
    </Authcontext.Provider>
  )
}

export default AuthProvider
export  {Authcontext};