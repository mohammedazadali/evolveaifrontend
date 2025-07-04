import React from 'react'
import Auth from './pages/Auth'
import Login from './pages/Login'
import {BrowserRouter, Routes,Route } from "react-router"
import PrivateRoute from './utils/PrivateRoute'
import Chatbot from './components/Chatbot/Chatbot'

const App = () => {
  return (
    <>
    <BrowserRouter>
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