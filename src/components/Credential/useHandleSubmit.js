import { useState } from 'react';
import { generateKeyFromMasterPassword } from './keyGenerator';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const useHandleSubmit = (masterPassword) => {
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event, serviceName, username, password, resetForm) => {
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

   
    const encryptionKey = generateKeyFromMasterPassword(masterPassword).toString(CryptoJS.enc.Hex);
    const encryptedServiceName = CryptoJS.AES.encrypt(serviceName, encryptionKey).toString();
    const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

    const payload = {
      serviceName: encryptedServiceName,
      username: encryptedUsername,
      password: encryptedPassword,
    };

    try {
      const response = await axios.post('/api/credentials', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status !== 201) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      console.log('Data successfully sent to backend:', response.data);
    } catch (error) {
      console.error('Failed to send data to backend:', error);
    }

    resetForm();
    setFormErrors({});
  };

  return { handleSubmit, formErrors };
};

export default useHandleSubmit;
