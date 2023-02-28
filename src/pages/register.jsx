import React, { useState } from 'react';
import {auth, googleAuth} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'


const Register = () => {

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        if(formData.get('email') == '' || formData.get('password') == '' || formData.get('username') == ''){
          setError(true)
         return;
        }
        const email = formData.get('email')
        const password = formData.get('password')
        try{
           const userCred = await createUserWithEmailAndPassword(auth,email,password)
           const user = userCred.user
           setError(false)
           setMessage('Users Registered Successfully. Please Proceed to login')
           setTimeout(()=>{
              navigate('/', {replace:true})
           }, 2000)
        }
        catch(error){
         const errcode = error.code;
         const errmsg = error.message;
         setError(true)
         console.log(errcode)
         console.log(errmsg)
        }
     
       }

       const signinwithgoogle = async()=>{
        try{
            await signInWithPopup(auth, googleAuth)
        }catch(err){
            setError(true)
            console.log(err)
        }
    }
  return (
    <>
    <div className='flex justify-center flex-col item-center h-screen bg-gray-200 w-full p-2 md:p-2'>
    <h1 className='text-4xl md:text-5xl text-center font-bold'>Tech Square Gallery </h1>
      <form className='w-full md:w-1/3 bg-white h-auto py-10 mt-10 shadow-lg mx-auto' onSubmit={handleSubmit}>
        {message && <p className='p-2 bg-green-200 m-5 rounded-md text-green-900'>{message}</p>}
      <h1 className='text-3xl text-center mt-4'>Register Users</h1>
        <div className='flex flex-col w-4/5 m-auto'>
            <label htmlFor='email'>Email:</label>
            <input type={`email`} name='email'id='email' className='bg-white p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto'>
            <label htmlFor='username'>Username:</label>
            <input type={`text`} name='username'id='username' className='bg-white p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto'>
            <label htmlFor='password'>Password:</label>
            <input type={`password`} name='password' id='password' className='bg-white p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto'>
            <input type={`submit`} name='submit' id='submit' className='bg-gray-800 rounded-sm text-white font-bold p-2 shadow-sm focus:outline-none border my-3' value={'Register'}/>
        </div>
        <div className='flex flex-col w-4/5 m-auto mt-4'>
          {error && (<span className='block my-5 bg-red-100 p-2 text-red-500 rounded'>Something Went Wrong!</span>)}
          
           <p>Provide the adequate information to register</p>

           <button type='button' className='bg-blue-500 p-2 mt-7 rounded-md text-white text-sm' onClick={signinwithgoogle}>Sign In With Google</button>

           <p className='mt-4'>Already Registered? <Link to="/" className='text-blue-500'>Login</Link></p>
        </div>
      </form>
    </div>
</>
  )
}

export default Register