import React from 'react'
import Auth from './pages/Auth'
import Login from './pages/Login'
import {BrowserRouter, Routes,Route } from "react-router"
import PrivateRoute from './utils/PrivateRoute'
import Chatbot from './components/Chatbot/Chatbot'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
    
     <ToastContainer />
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chatbot' element={
        <PrivateRoute>
          <Chatbot/>
        </PrivateRoute>
      }/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App