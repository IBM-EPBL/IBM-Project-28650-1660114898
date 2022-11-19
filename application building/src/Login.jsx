
import './App.css';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {useNavigate } from 'react-router-dom';


function Login() {
  const ref_userid = useRef(null);
  const ref_psd =  useRef(null);
  const baseURL = "http://127.0.0.1:5000/login";
  const [loading, setloading] = useState(false);
  const [promtmsg, setPromtmessage] = useState("");
  let history = useNavigate()

  
  const register = (e) => {
        
    setloading(true) 
    setPromtmessage("")
      
        const data = { 
           userid :ref_userid.current.value,
           psd : ref_psd.current.value,
      
          
        };
        axios
        .post(baseURL, JSON.stringify(data))
        .then((response) => {
          console.log(response);
          const dataa = response.data;
          if(dataa.error==0){
            if(dataa.validation==0){
              setPromtmessage("Incorrect Email or Password")
              setloading(false) 
            }
            else{
  
              setPromtmessage("Login Successfull")
              history("/predict")
            }
          }else{
            setPromtmessage("An Error Occured")
            setloading(false) 

          }
         
        });
    
   
    
  };
  return (
    <div class="main-form-holder">
      <div className='innerform'>
      <h1>Login</h1>
      <form name="client-data">
       
        <input ref={ref_userid} type="text" name="MinTemp"  placeholder="" required />
        <label for="name" >User Id</label>


        <input  ref={ref_psd}  type="password" name="psd" placeholder="" required />
        <label for="psd" >Password</label>

        <div className='promtmessage loginpromt'>{promtmsg}</div>

       
        <button onClick={(e) => register(e)} class="submit-btn" type="button">
        {loading?<div class="lds-dual-ring"></div>:"Login"} 
        </button>

      </form>
      </div>
    </div>
  );
}

export default Login;
