import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/SettingsPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/setting' element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 
