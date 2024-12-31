import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CalendarPage from './pages/CalendarPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import ViewJournalPage from './pages/ViewJournalPage/ViewJournalPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/setting' element={<SettingsPage />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/view-journal' element={<ViewJournalPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
