import React from 'react'
import './App.css'
import { SignIn } from './components/SignIn'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './components/Login';
import { DashBoard } from './components/DashBoard';

export const App = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<DashBoard />}/>
    </Routes>
    </>
  )
}
