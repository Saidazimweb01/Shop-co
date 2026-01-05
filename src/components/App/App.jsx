import React, { use, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../../Pages/Login/Login'
import Default from '../../Pages/Default/Default'
import Register from '../../Pages/Register/Register'
import Private from '../../Pages/Private/Private'
import "./App.css"
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Admin from '../../Pages/Admin/Admin'

import { jwtDecode } from 'jwt-decode'
import Detail from '../../Pages/Detail/Detail'
import Allproducts from '../../Pages/Allproducts/Allproducts'
// import ""

function App() {

  const [isLoadingLog, setIsLoadingLog] = useState("Log in")
  const [isLoadingUp, setIsLoadingUp] = useState("Create account")
  // const [isDark, setIsDark] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    if (!token) {
      setUserRole(null)
      return
    }

    try {
      let decoded = jwtDecode(token)
      setUserRole(decoded.role)
    }
    catch (err) {
      localStorage.removeItem("token")
      setToken(null)
      setUserRole(null)
    }
  }, [token])

  // let token

  // useEffect(() => {
  //   token = localStorage.getItem("token")
  //   if (!token) {
  //     setUserRole(null)

  //     return
  //   }

  //   try {
  //     let decoded = jwtDecode(token)
  //     setUserRole(decoded.role)

  //   } catch {
  //     localStorage.removeItem("token")
  //     setUserRole(null)
  //   }

  // }, [])




  return (
    <>

     
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={
            <Login setToken={setToken} isLoadingLog={isLoadingLog} setIsLoadingLog={setIsLoadingLog} />
          } />
          <Route path='/' element={
            userRole ? <Navigate to={`/${userRole}`} /> : <Default token={token} setToken={setToken} />
          } />
          <Route path='/register' element={<Register isLoadingUp={isLoadingUp} setIsLoadingUp={setIsLoadingUp} />} />
          <Route path='/user' element={

            <PrivateRoute role={"user"}>
              <Private token={token} setToken={setToken} />
            </PrivateRoute>
          } />
          <Route path='/admin' element={
            <PrivateRoute role={"admin"}>
              <Admin token={token} setToken={setToken} />
            </PrivateRoute>
          } />
          <Route path='/detail/:id' element={
            <PrivateRoute role={"user"}>
              <Detail token={token} setToken={setToken} />
            </PrivateRoute>
          } />
          <Route path='/products' element={
            <PrivateRoute role={"user"}>
              <Allproducts token={token} setToken={setToken} />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App