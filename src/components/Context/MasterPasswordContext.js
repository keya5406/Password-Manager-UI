import React, { createContext, useState, useContext, useEffect } from 'react';
import { decryptPassword, generateEncryptionKey } from '../Utils/SecurityUtils'; 
import { fetchSalt } from '../Auth/loginApi';  
import { useEmail } from './EmailContext';  

const MasterPasswordContext = createContext();

export const MasterPasswordProvider = ({ children }) => {
  const [masterPassword, setMasterPassword] = useState('');
  const { email } = useEmail(); 
  
  useEffect(() => {
    const encryptedPassword = sessionStorage.getItem('encryptedMasterPassword');
    if (encryptedPassword && email) {
      
      const fetchAndDecrypt = async () => {
        try {
          const salt = await fetchSalt(email); 
          const encryptionKey = generateEncryptionKey(email, salt);  
          const decryptedPassword = decryptPassword(encryptedPassword, encryptionKey);  
          setMasterPassword(decryptedPassword); 
        } catch (error) {
          console.error('Error while fetching salt or decrypting password:', error);
        }
      };

      fetchAndDecrypt();
    }
  }, [email]);  

  return (
    <MasterPasswordContext.Provider
      value={{ masterPassword, setMasterPassword }}
    >
      {children}
    </MasterPasswordContext.Provider>
  );
};

export const useMasterPassword = () => useContext(MasterPasswordContext);
