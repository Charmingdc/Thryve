import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';

import { Toaster } from 'sonner';
import './index.css';

import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import PublicRoute from './Routes/PublicRoute.jsx';

import App from './App.jsx';
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
   <AuthProvider>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<App />} />
         <Route path='*' element={<ErrorPage />} />
         <Route path='/login' element={<PublicRoute> 
             <LoginPage /> 
           </PublicRoute>
         } />
         <Route path='/signup' element={<PublicRoute>
             <SignupPage />
           </PublicRoute>
         } />
         <Route path='/reset-password' element={
           <PublicRoute>
             <ResetPasswordPage />
           </PublicRoute>
         } />
         
         
         <Route path='/home' element={
           <ProtectedRoute>
             <HomePage />
           </ProtectedRoute>
         } />
         <Route path='/setting' element={
           <ProtectedRoute>
             <SettingsPage />
           </ProtectedRoute>
         } />
         <Route path='/calendar' element={
           <ProtectedRoute>
             <CalendarPage />
          </ProtectedRoute> 
         } />
         <Route path='/add-journal' element={
           <ProtectedRoute>
             <AddJournalPage />
           </ProtectedRoute>
         } />
         <Route path='/view-journal/:journalId' element={
           <ProtectedRoute>
             <ViewJournalPage />
           </ProtectedRoute>
         } />
         <Route path='/edit-journal/:journalId' element={
           <ProtectedRoute>
             <EditJournalPage />
           </ProtectedRoute>
         } />
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
    </AuthProvider>
  </React.StrictMode>,
)
