import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signIn = (e) =>{
        e.preventDefault()
        //  here we do firebase autandtication.
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            console.log('authlogin',auth)
            navigate('/')
            
        })
        .catch((error)=> alert(error.message))
    }

    const register =(e)=>{
        e.preventDefault()
        // do some firebase register shitt.
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            // it's succesfull to createa new user with email and pasword.
            console.log("auth",auth)
            if(auth){
                navigate('/')
            }
        })
        .catch((error)=> alert(error.message))
    }
  return (
    <div className='login' >
        <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'  />
     
     <div className='login_container' >
        <h1>Sign-in</h1>
        <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <h5>Password</h5>
            <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            <button className='login_signInButton' onClick={signIn} type='submit'  >Sign In</button>
        </form>
        <p>
       By signing-in  you agree to the AMAZON FAKE CLONE Condition  of Use & Sale. Please see our Privacy Notice, ourCookies Notice and our Interest-Based Ads Notice.
        </p>
        <button onClick={register} className='login_registerButton' >Create Your Amazon Account</button>

     </div>
    </div>
  )
}
