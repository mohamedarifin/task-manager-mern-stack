import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";
export const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(true);
  const [loginRes, setloginRes] = useState('');
  const [passeye, setpasseye] = useState("bi bi-eye fw-bold fs-4 text-dark");
  const [passchange, setpasschange] = useState(true)

  const navigate = useNavigate();
  
  useEffect(()=>{
    let dash = localStorage.getItem("UsErEmAiL010A")
      if(dash){
        navigate('/dashboard');
      }
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(false)
      await axios.post('https://task-manager-mern-stack-zaxt.onrender.com/login' , { email , password })
      .then(res =>{
        setloading(true)
        setloginRes(res.data.msg);
        if(res.data.msg == 'Login Successfull'){
          localStorage.setItem("UsErEmAiL010A",email);
          addNotification({
            title: 'Task Manager',
            subtitle: 'Login',
            message: 'Login Successfull',
            onClick: ()=> window.location = window.location,
            theme: 'darkblue',
            duration: 864000000,
            closeButton: 'Go away',
            native: true,
            icon: 'https://img.icons8.com/bubbles/100/reminders.png',
          })
        }
      })

      let istrue = localStorage.getItem("UsErEmAiL010A")
      if(istrue){
        navigate('/dashboard');
      }
  }

  return (
    <>
      <div className="login_page">
        <form  onSubmit={submitHandler} className='w-100'>
          <h2 className='mb-4'>LogIn</h2>
          <label >Email</label>
          <input type="email"  placeholder='Enter Your Email' required className='form-control' onChange={(e)=>{
            setemail(e.target.value);
          }}/>

          <div className="password">
          <label htmlFor="password">Password</label>
          <input type={ passchange ? "password" : "text" }  required placeholder='Enter Your Password' className='form-control' onChange={(e)=>{
            setpassword(e.target.value);
          }} />
          <div className='pass_eye'> 
            
              <i className={passeye} onClick={()=>{
                setpasschange(false)
                if(passeye === "bi bi-eye fw-bold fs-4 text-dark"){
                  setpasseye("bi bi-eye-slash fw-bold fs-4 text-dark")
                }
                if(passeye === "bi bi-eye-slash fw-bold fs-4 text-dark"){
                  setpasschange(true);
                  setpasseye("bi bi-eye fw-bold fs-4 text-dark")
                }
                
             }}>
             </i>

          </div>
          
          </div>

          <div className="page_btns d-flex justify-content-between mt-3">
            <input type='submit' className='btn btn-info text-light fw-bold' value="LogIn" />

            {
            loading 
            ?<div></div>
            :<div className="spinner-border mt-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            }
            <button className="btn btn-light fw-bold" onClick={()=>{
              navigate('/');
            }}>SignIn</button>
          </div>
          
          {loginRes ? <p className='text-danger  text-center p-1 LoginRes'>{loginRes}</p> : <p></p>}
        </form>
      </div>
    </>
  )
}
