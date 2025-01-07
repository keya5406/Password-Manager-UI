import { useState } from 'react';
import { useKeyGenerator } from './keyGenerator';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const useHandleSubmit = (masterPassword) => {
  const [formErrors, setFormErrors] = useState({});
  const { generateKeyFromMasterPassword } = useKeyGenerator();

  const handleSubmit = async (event, serviceName, username, password, resetForm, email) => {
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

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }


    const encryptionKey = await generateKeyFromMasterPassword(masterPassword);
    
    const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();



    const payload = {
      serviceName ,
      username: encryptedUsername,
      password: encryptedPassword,
    };

    try {
      const response = await axios.post(`/api/credentials/${email}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status !== 201) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send data to backend:', error);
    }

    resetForm();
    setFormErrors({});
  };

  return { handleSubmit, formErrors };
};

export default useHandleSubmit;
