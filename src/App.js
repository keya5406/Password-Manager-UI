import React, { useState } from 'react';
import './App.css';
import './styles/output.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/Common/NavBar';
import CredentialForm from './components/Credential/CredentialForm';
import Footer from './components/Common/Footer';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/SignupForm';
import { MasterPasswordProvider } from './components/MasterPasswordContext';

function App() {

  return (
    <MasterPasswordProvider>
      <div className="bg-blue-100 min-h-screen flex flex-col">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<SignupForm />} />
            <Route path="/loginForm" element={<LoginForm />} />
            <Route path="/credentialForm" element={<CredentialForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </MasterPasswordProvider>
  );
}

export default App;
