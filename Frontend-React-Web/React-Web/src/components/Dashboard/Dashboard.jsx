import axios from 'axios'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect , useState} from 'react'
import axiosInstance from '../../axiosInstance'
import { Form } from 'react-router-dom'

const Dashboard = () => {
    const [ticker,setTricker] = useState()
    const [error , seterror] = useState()
    const [loading ,setloading] = useState(false)
    const [plot , setplot]= useState()
    // const [ma100 , SetMA100]= useState()
    const [Future_Prediction , SetFuture_Prediction]= useState()
    const [prediction , SetPrediction]= useState()
    const [mse , SETMSE]= useState()
    const [r , SETr ]= useState()
    const [rmse, SETrmse]= useState()



    
        useEffect(() =>{
        const fetchProtectedData = async ()=>{
          try{
            const response = await axiosInstance.get('/protected-view/',);
            console.log('response successfull' ,response.data);
          }catch(error){
            console.error('Error feteching data', error)
          }
      }
        fetchProtectedData();
    },[])
    
    const handel_tricker= async(e)=>{
      e.preventDefault();
      setloading(true)
       try{
           const response =await axiosInstance.post('/predict/',{ ticker:ticker });
           console.log('data .............', response.data)
           const backend_root=import.meta.env.VITE_BACKEND_ROOT
           const plot_url=`${backend_root}${response.data.plot_img}`
        //    const ma_100URL=`${backend_root}${response.data.plot_100_dma}`
        //    const ma_200URL=`${backend_root}${response.data.plot_200_dma}`
           const predictionUrl=`${backend_root}${response.data.plot_Prediction}`
           const Future_Prediction_url=`${backend_root}${response.data.Future_Prediction}`

           



           console.log(plot_url)
           console.log(Future_Prediction_url)
        //    SetMA100(ma_100URL)
           SetFuture_Prediction(Future_Prediction_url)
           setplot(plot_url)
           SetPrediction(predictionUrl)
           SETMSE(response.data.mse)
           SETrmse(response.data.rmse)
           SETr(response.data.r)
    
           
           // set plot

           if(response.data.error){
              seterror(response.data.error)
            };
       }catch(error){
          console.log('error is getting durring prediction' , error)
       }finally{
         setloading(false)
       }
       return 
    }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
           <form onSubmit={handel_tricker}>
            <input type="text"  className='form-control' 
            placeholder='Enter Stock Tricker'onChange={(e)=> setTricker(e.target.value)} required/>
            <small>{error && <div className='text-danger'> {error}</div>}</small>
            <button  type='submit' className='btn btn-info mt-3' >{loading ? <span>  <FontAwesomeIcon icon={faSpinner} spin/> Predicting ...</span> : 'See Prediction'}</button>

           </form>
        </div>
        {/* plot the image */}
        {prediction && (
          <div className="predection mt-5">
              <div className="p-5">
                {plot && (
                  <img src={plot} style={{maxWidth: '100%'}}/>
                )}
                </div>

              {/* <div className="p-3">
                  {ma100 && (
                  <img src={ma100} style={{maxWidth: '100%'}}/>
                )}
                </div>

              <div className="p-3">
                  {ma200 && (
                  <img src={ma200} style={{maxWidth: '100%'}}/>
                )}
              </div> */}
              
              <div className="p-3">
                  {prediction && (
                  <img src={prediction} style={{maxWidth: '100%'}}/>
                )}
              </div>

              <div className="p-3">
                  {Future_Prediction && (
                  <img src={Future_Prediction} style={{maxWidth: '100%'}}/>
                )}
              </div>
              
              <div className="text-light p-3">
                    <h4>MODEL EVALUTION</h4>
                    <p>Means Square Error (mse)    :{mse}</p>
                    <p>ROOT Means Square Error (Rmse):(Rmse) {rmse}</p>
                    <p>R- Square Error (R-s)       :{r}</p> 
              </div>

        </div>
     
    
        
        )}
  
    </div>
    </div>
    
  )
}

export default Dashboard;