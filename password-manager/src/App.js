import React, { useState } from 'react';
//import './App.css'; 
function App() {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Service Name:', serviceName);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="app">
      <header>
        <h1>Password Manager</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      
      <section className="hero">
        <h2>Securely store and manage your passwords</h2>
      </section>

      <section className="form-section">
        <form id="passwordForm" onSubmit={handleSubmit}>
          <label htmlFor="service-name">Service Name</label>
          <input
            type="text"
            id="service-name"
            name="service-name"
            placeholder="e.g., Gmail"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
          
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g., user123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit">Submit</button>
        </form>
      </section>

      <footer>
        <p>© 2024 Password Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
