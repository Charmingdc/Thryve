import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx';
import './index.css';
import AddJournalPage from './pages/AddJournalPage';
import CalendarPage from './pages/CalendarPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage';
import ViewJournalPage from './pages/ViewJournalPage';



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
        <Route path='/add-journal' element={<AddJournalPage />} />
        <Route path='/view-journal' element={<ViewJournalPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  </React.StrictMode>,
)
