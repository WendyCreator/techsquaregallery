import {React, useState, useEffect, useContext} from 'react'
import {auth, googleAuth} from '../config/firebase'
import {signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {LoginAuth} from '../config/Context';


const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const {loggedin, setLoggedin} = useContext(LoginAuth)

    useEffect(()=>{
      // if(loggedin)navigate('home',{ replace: true })
      if(auth.currentUser) navigate('home',{ replace: true })
    }, 
    [loggedin])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        if(formData.get('email') == '' || formData.get('password') == ''){
          setError(true)
         return;
        }
        const email = formData.get('email')
        const password = formData.get('password')
        try{
           const userCred = await signInWithEmailAndPassword(auth,email,password)
           const user = userCred.user
           setError(false)
           setLoggedin(true)
           console.log(user.email)
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
            const user = await signInWithPopup(auth, googleAuth)
           setError(false)
           setLoggedin(true)
          //  navigate('home', { replace: true })
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
    <div className='flex justify-center flex-col item-center h-screen bg-gray-200 w-full p-2 md:p-4'>
    <h1 className='text-4xl md:text-5xl text-center font-bold'>Tech Square Gallery </h1>
      <form className='w-full md:w-1/3 bg-white h-3/4 mt-10 shadow-lg mx-auto' onSubmit={handleSubmit}>
      <h1 className='text-3xl text-center mt-4'>User Login</h1>
        <div className='flex flex-col w-4/5 m-auto'>
            <label htmlFor='email'>Email:</label>
            <input type={`email`} name='email'id='email' className='bg-white p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto'>
            <label htmlFor='password'>Password:</label>
            <input type={`password`} name='password' id='password' className='bg-white p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto'>
            <input type={`submit`} name='submit' id='submit' value={'Login'} className='bg-gray-800 text-white font-bold p-2 shadow-sm focus:outline-none border my-3' />
        </div>
        <div className='flex flex-col w-4/5 m-auto mt-4'>
          {error && (<span className='block my-5 bg-red-100 p-2 text-red-500 rounded'>Invalid Login detail</span>)}
          
           <p>Provide the adequate information to login to the dashboard</p>

           <button type='button' className='bg-blue-500 p-2 mt-7 rounded-md text-white text-sm' onClick={signinwithgoogle}>Sign In With Google</button>

           <p className='mt-5'>Don't have an account? <Link to="register" className='text-blue-500'>Register</Link></p>
        </div>
      </form>
    </div>
</>
  )
}

export default Login