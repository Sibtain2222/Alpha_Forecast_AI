import {useContext} from 'react'
import Button from './Button'
import { Link , useNavigate } from 'react-router-dom'
import { Authcontext } from '../AuthProvider'

const Logout = () => {
  const  navigate=useNavigate()
  const {isLoggedIn , setIsLoggedIn} = useContext(Authcontext)
  const handleLogout=()=>{
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
      navigate('/login')
      console.log('logoutt')

  }
  return (
    <>
     <div className='navbar container pt-3 pb-3 align-items-start'>
        <Link  to="/" className='navbar-brand text-light'> ALPHA FORECAST AI</Link>
        <div>
          {isLoggedIn ?(
            <>
             <Button text='Dashboard' class="btn-info" url="/dashboard"/>
             &nbsp;
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
           
            </>
          ):(
            <>
          <Button text='Login' class="btn-outline-info" url="/login"/>
          &nbsp;
          <Button text='Register' class="btn-info" url="/register"/> 
          </>
          )}
        </div>
     </div>
    </>
  )
}

export default Logout