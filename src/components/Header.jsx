import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../config/firebase';
import {signOut} from 'firebase/auth'
import { useNavigate, NavLink } from 'react-router-dom';
import {LoginAuth} from '../config/Context';





const Header = () => {
  const [userid, setUserid] = useState('')
  const {loggedin, setLoggedin} = useContext(LoginAuth)
  const navigate = useNavigate();

  const user = auth.currentUser;
 
  useEffect(()=>{
    if(!user){
      navigate('/', {replace:true})
      return
    }
    setUserid(user.uid)
  }, 
  [loggedin])

  const logout= async()=>{
    try{
        await signOut(auth)
        setLoggedin(false);

    }catch(err){
        console.log(err)
    }
}
  return (
    <div className="bg-white p-2 shadow-xl">
    <h1 h1 className="text-slate-800 font-bold text-3xl md:text-4xl lg:text-5xl my-10 lg:mt-20 lg:mb-14 text-center">
    Welcome To Tech Square Gallery
    </h1>
    <div className="flex justify-between">
      <NavLink to='/home' className=" text-black p-3 px-5 hover:text-purple-600 font-bold-200 text-lg md:text-xl">Home</NavLink>
      <NavLink to='/library' className=" text-black p-3 px-5 hover:text-purple-600 font-bold-200 text-lg md:text-xl">Gallery</NavLink>
      <button className="text-red-600 p-3 px-5 border-red-500 rounded-lg border-spacing-20 border-2" onClick={logout}>Logout</button>
    </div>
    </div>
  )
}

export default Header