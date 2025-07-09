import React from 'react'
import Auth from './pages/Auth'
import Login from './pages/Login'
import {BrowserRouter, Routes,Route } from "react-router"
import PrivateRoute from './utils/PrivateRoute'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Navbar from './components/common/Navbar'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <ToastContainer />
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chatbot' element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App