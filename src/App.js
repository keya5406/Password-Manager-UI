import React, { useState } from 'react';
import './App.css';
import './styles/output.css';
import NavBar from './components/NavBar';
import CredentialForm from './components/CredentialForm';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
function App() {
  
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <NavBar />
      <SignupForm/>
      <CredentialForm/>
      <Footer />
    </div>
  );
}

export default App;
