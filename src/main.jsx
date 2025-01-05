import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from 'sonner';

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
import EditJournalPage from './pages/EditJournalPage/EditJournalPage.jsx';



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
        <Route path='/view-journal/:journalId' element={<ViewJournalPage />} />
        <Route path='/edit-journal/:journalId' element={<EditJournalPage />} />
      </Routes>
      <Toaster 
        position='top-center'
        closeButton={true}
        visibleToasts={2}
        theme='system'
        richColors={true}
        toastOptions={{
          style: {
            padding: '.6rem',
            borderRadius: '2rem',
          }
        }} />
    </BrowserRouter>
  </React.StrictMode>,
)
