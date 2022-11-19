
import './App.css';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { json } from 'react-router-dom';
import  { useNavigate  } from 'react-router-dom'


function Register() {
  const ref_userid = useRef(null);
  const ref_psd =  useRef(null);
  const reenter_ref_psd = useRef(null)
  const baseURL = "http://127.0.0.1:5000/register";
  const [loading, setloading] = useState(false);
  const [promtmsg, setPromtmessage] = useState("");
  let history = useNavigate()
  
  const register = (e) => {
   
    setloading(true) 
    setPromtmessage("")
    if(ref_psd.current.value!=reenter_ref_psd.current.value){
    setPromtmessage("Password Mismatch")
    setloading(false) 
    }
    else{
      
        const data = { 
           userid :ref_userid.current.value,
           psd : ref_psd.current.value,
      
          
        };
         
        axios
        .post(baseURL, JSON.stringify(data))
        .then((response) => {
          console.log(response);
          const dataa = response.data;
          if(dataa.alreadyexits==1){

            setPromtmessage("Email Already Exists")
          }
          else if(dataa.error==1){

            setPromtmessage("An error occured")
          }
          else{

            setPromtmessage("Sucessfully Registered")
          }
          setloading(false) 
       
        });
    
      }
    
  };
  return (
    <div class="main-form-holder">
      <div className='innerform'>
      <h1>Register</h1>
      
   
      <form name="client-data">
       
        <input ref={ref_userid} type="text" name="MinTemp"  placeholder="" required />
        <label for="name" >User Id</label>


        <input  ref={ref_psd}  type="password" name="psd" placeholder="" required />
        <label for="psd" >Password</label>

        <input  ref={reenter_ref_psd}  type="password" name="psd" placeholder="" required />
        <label for="psd" >Reenter Password</label>
        <div className='promtmessage'>{promtmsg}</div>
        <button onClick={(e) => register(e)} class="submit-btn" type="button">
        {loading?<div class="lds-dual-ring"></div>:"Sign UP"} 
        
        </button>
      
        <button onClick={(e) => history('/Login')} class="submit-btn" type="button">
        Login
        
        </button>
      </form>
      </div>
    </div>
  );
}

export default Register;
