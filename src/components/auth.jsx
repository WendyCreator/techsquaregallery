import React from 'react'
import {auth, googleAuth} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const signin = async(e)=>{
        e.preventDefault();
        try{
         await createUserWithEmailAndPassword(auth, email, password)
        }catch(err){
        console.error(err)
        }
    }
    const signinwithgoogle = async()=>{
        try{
            await signInWithPopup(auth, googleAuth)
        }catch(err){
            console.log(err)
        }
    }

    const logout= async()=>{
        try{
            await signOut(auth)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <form onSubmit={signin}>
            <input type="email" placeholder='User Email...' 
            onChange={(e)=>setEmail(e.target.value)}/> <br />
            <input type="password" placeholder='User Password...' 
             onChange={(e)=>setPassword(e.target.value)} /> <br />
            <button>Sign In</button>
        </form>
        <button onClick={signinwithgoogle}>Sign in with google</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth