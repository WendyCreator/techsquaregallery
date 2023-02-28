import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/', {replace:true})
        }, 5000)
    }, [])
  return (
    <div className='flex flex-col justify-center h-screen '>
    <h2 className='text-center text-5xl font-bold mt-10 border-black border-l-2'>Page Not Found!...</h2>
    <Link to='/' className='px-10 py-3 bg-black text-white mt-10 block w-1/2 m-auto'>Back to Login</Link>
  </div>
  )
}

export default Notfound