import React, { useState } from 'react';
import './App.css';
import './styles/output.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import CredentialForm from './components/CredentialForm';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
function App() {

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/CredentialForm" element={<CredentialForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
