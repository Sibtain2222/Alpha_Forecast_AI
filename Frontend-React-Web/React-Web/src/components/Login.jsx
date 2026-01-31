import { useState , useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import awios from 'axios'
import { useNavigate } from "react-router-dom"
import { Authcontext } from "../AuthProvider"

const Login = () => {
   const [username, setusername] = useState('')
   const [password, setpassword] = useState('')
   const [loading ,setloading] = useState(false)
   const navigate=useNavigate()
   const [error, seterror]= useState('')
   const {isLoggedIn , setIsLoggedIn} =useContext(Authcontext)

   const handellogin= async(e)=>{
     e.preventDefault();
     setloading(true)
     const userdata={username,password}
     console.log('userdata =>' ,userdata)
    try{
      const response= await awios.post('http://127.0.0.1:8000/prediction/v1/token/' , userdata)
      localStorage.setItem('accessToken' ,response.data.access) 
      localStorage.setItem('refreshToken' , response.data.refresh)   
      console.log('login sucessfull')
      setIsLoggedIn(true)
      navigate('/dashboard')  
    }catch(error){
        console.error("Invalid credentials")
        seterror("Invalid credentials ")
    }finally{
      setloading(false)
    }

   }
  return (
     <>
        <div  className="container mt-5   py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 bg-light-dark p-5 rounded">
              <div className="text-light text-center "><h3 className='mb-4'>Login to our portal</h3>
              <form  onSubmit={handellogin}>
                <div className='mb-3'>
                 <input type='text' className='form-control ' value={username} placeholder='Username' onChange={(e)=>setusername(e.target.value)}/>
                 </div>
                <div className='mb-3'>
                 <input type='password' className='form-control ' value={password} placeholder='Set Password' onChange={(e)=> setpassword(e.target.value)}/>
                 {error && <div className="text-danger">{error}</div>}
                </div>
                {loading ? (
                   <button type='submit' className='btn btn-info d-block mx-auto' disabled ><FontAwesomeIcon icon={faSpinner} spin/> logging In ...</button>
                ): (
                   <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
                )}
                
    
    
              </form>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default Login