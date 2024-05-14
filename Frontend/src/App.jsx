import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'

const App = () => {
  return (
   <>
   <Routes>
   {/* <Route path="/" element={<Home />} /> */}
   <Route path="/" element={<Login />} />
   <Route path="/register" element={<Register />} />
   </Routes>
   </>
  )
}

export default App
