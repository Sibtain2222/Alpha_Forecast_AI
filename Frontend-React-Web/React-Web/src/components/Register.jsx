import {useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username, setusername] = useState('')
  const [email,setemail] = useState('')
  const [password, setpassword] = useState('')
  const [errors , seterror]= useState({})
  const [success, setsuccess] = useState(false)
  const [loading ,setloading] = useState(false)
  const handelRegistration= async(e)=>{
    e.preventDefault();
    setloading(true);
    const userdata={
      username,email,password
    }
    try{
      const response=await axios.post('http://127.0.0.1:8000/prediction/v1/register/' ,userdata);
      console.log('responsedata==>' ,response.data );
      console.log('registration successfull');
      seterror({})
      setsuccess(true)
    }catch(error){
      seterror(error.response.data)
      console.error('registrations error' , error.response.data )
    }finally{
      setloading(false)
    }
  }
  return (
    <>
    <div  className="container mt-5   py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <div className="text-light text-center "><h3 className='mb-4'>Create an a acount</h3>
          <form onSubmit={handelRegistration}>
            <div className='mb-3'>
             <input type='text' className='form-control ' value={username} placeholder='Username' onChange={(e)=>setusername(e.target.value)}/>
             <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
             </div>
            <div className='mb-3'>
             <input type='text' className='form-control ' value={email}  placeholder='Your Email' onChange={(e) => setemail(e.target.value)}/>
             <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
            </div>
            <div className='mb-3'>
             <input type='password' className='form-control ' value={password} placeholder='Set Password' onChange={(e)=> setpassword(e.target.value)}/>
             <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
            </div>
            {success && <div className='alert alert-success'> Registration Succussfull</div>}
            {loading ? (
               <button type='submit' className='btn btn-info d-block mx-auto' disabled ><FontAwesomeIcon icon={faSpinner} spin/> Please wait ...</button>
            ): (
               <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
            )}
            


          </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register