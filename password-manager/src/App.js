import React, { useState } from 'react';
import './App.css';
import './styles/output.css';
import NavBar from './components/NavBar';
import Manager from './components/Manager';
import Footer from './components/Footer';
function App() {
  const [errors, setErrors] = useState({});

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <NavBar />
      <Manager setErrors={setErrors} />
      <Footer />
    </div>
  );
}

export default App;
