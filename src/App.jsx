import { useState} from 'react'
import { Routes, Route } from "react-router-dom"
// import './App.css'
import Login from './pages/login'
import Register from './pages/register';
import Home from './pages/home'
import Library from './pages/library'
import {LoginAuth} from './config/Context';
import Notfound from './pages/Notfound';



function App() {
 
  const [loggedin, setLoggedin] = useState(false)

 

  return (
    <div className="App">
      <LoginAuth.Provider value={{loggedin, setLoggedin}}>
      <Routes>
      <Route path='/' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='library' element={<Library />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>
      </LoginAuth.Provider>
        
  
     
    </div>
  )
}

export default App
