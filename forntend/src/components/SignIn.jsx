import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import addNotification from "react-push-notification";

export const SignIn = () => {

    
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(true)
    const [validPass, setvalidPass] = useState(true)
    const [SignInRes, setSignInRes] = useState('');

    
    //EYE BTN PASSWORD CONCEPT :- 

    const [passeye, setpasseye] = useState("bi bi-eye fw-bold fs-4 text-dark");
    const [passchange, setpasschange] = useState(true);

    //NAVIGATE HOOK :-

    const navigate = useNavigate();

    //USEEFFECT FOR NAVIGATING DASHBOARD :-

    useEffect(()=>{
      const dash = localStorage.getItem("UsErEmAiL010A");
      if(dash){
        navigate('/dashboard')
      }
    },[])

    //submitHandler FOR SIGN_UP :-

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(name && email && password.length >=8){
          setvalidPass(true)
          setloading(false)
          await axios.post('https://task-manager-mern-stack-zaxt.onrender.com/signup' , { name , email , password })
          .then(res=>{
          setloading(true)
          setSignInRes(res.data.msg);
          if(res.data.msg == "Successfully SignIned"){
          navigate('/login');
          addNotification({
            title: 'Task Manager',
            subtitle: 'SignUp',
            message: 'Successfully SignIned',
            onClick: ()=> window.location = window.location,
            theme: 'darkblue',
            duration: 864000000,
            closeButton: 'Go away',
            native: true,
            icon: 'https://img.icons8.com/bubbles/100/reminders.png',
          })
          }
        });
        }else{
          setvalidPass(false)
        }
        
    }

  return (
    <>
        <div className="sign_up ">
        <form  onSubmit={submitHandler} className='w-100'>
          <h2 className='Signup_header'>SignUp</h2>
          <label  className='input-label'>UserName</label>
          <input type="text" placeholder='Enter Your Name' required  className='form-control' onChange={(e)=>{
            setname(e.target.value);
          }}/>
          <label >Email</label>
          <input type="email"  placeholder='Enter Your Email' required className='form-control' onChange={(e)=>{
            setemail(e.target.value);
          }}/>

          <div className="password">
          <label htmlFor="password">Password</label>
          <input type={ passchange ? "password" : "text" } required placeholder='Enter Your Password' className='form-control' onChange={(e)=>{
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
            {validPass ?<p className='text-danger mt-3'>{SignInRes}</p> : <p className='text-danger mt-3'>Password is too Short,Mininum 8 letter..</p>}
          <div className="page_btns d-flex justify-content-between">
            <input type='submit' className='btn btn-info' value="SignIn" />
            
            {
            loading 
            ?<div></div>
            :<div className="spinner-border mt-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            }
            <button className="btn btn-light fw-bold" onClick={()=>{
              navigate('/login');
            }}>Login</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

