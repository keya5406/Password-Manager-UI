import React, { useState } from 'react';
import { useMasterPassword } from '../Auth/MasterPasswordContext';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const CredentialForm = ({ setErrors }) => {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { masterPassword } = useMasterPassword();
    const generateKeyFromMasterPassword = (masterPassword) => {
    const salt = sessionStorage.getItem('salt') || CryptoJS.lib.WordArray.random(128 / 8);  
    sessionStorage.setItem('salt', salt.toString());  
    const key = CryptoJS.PBKDF2(masterPassword, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    return key;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};

    if (!serviceName) {
      newErrors.serviceName = 'Service Name is required.';
    }

    if (!username) {
      newErrors.username = 'Username is required.';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordPattern.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    if (masterPassword) {
      
      const encryptionKey = generateKeyFromMasterPassword(masterPassword).toString(CryptoJS.enc.Hex);
      console.log('Generated Encryption Key:', encryptionKey.toString);
      
      if (serviceName && username && password) {
        const encryptedServiceName = CryptoJS.AES.encrypt(serviceName, encryptionKey).toString();
        const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();


       
          const payload = {
            serviceName:encryptedServiceName,
            username: encryptedUsername,
            password: encryptedPassword
          };
          
        console.log("payload",payload);
        
        try {
          const response = await axios.post('/api/credentials', payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.status !== 201) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          console.log("Data successfully sent to backend:", response.data);
        } catch (error) {
          console.error("Failed to send data to backend:", error);
        }
        
      }
    
      

    }

    setServiceName('');
    setUsername('');
    setPassword('');
    setFormErrors({});
  };

  return (
    <section className="flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Securely store and manage your passwords</h2>
      <form id="passwordForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            id="service-name"
            name="service-name"
            placeholder="e.g., Gmail"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {formErrors.serviceName && <p className="text-red-600 text-sm">{formErrors.serviceName}</p>}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g., user123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {formErrors.username && <p className="text-red-600 text-sm">{formErrors.username}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {formErrors.password && <p className="text-red-600 text-sm">{formErrors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-900 transition duration-200 flex items-center justify-center mt-4">
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            style={{ width: '24px', height: '24px' }}
          />
          <span className="ml-2">Add Password</span>
        </button>
      </form>
    </section>

  );
};

export default CredentialForm;
