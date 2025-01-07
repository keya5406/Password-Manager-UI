import { useState } from 'react';
import { fetchSalt, login } from './loginApi.js';
import { hashPassword } from '../Utils/cryptoUtils.js';
import { useNavigate } from 'react-router-dom';
import { useMasterPassword } from '../Context/MasterPasswordContext.js';
import { useEmail } from '../Context/EmailContext.js';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setMasterPassword } = useMasterPassword();
  const { setEmail } = useEmail();
  const [email, setUserEmail] = useState('');
  const [masterPassword, setMasterPasswordState] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError({});

    const newErrors = {};
    if (!isValidEmail(email))
      newErrors.email = 'Please enter a valid email address.';
    if (!masterPassword) newErrors.password = 'Password is required.';
    else if (masterPassword.length < 8)
      newErrors.password = 'Password must be at least 8 characters long.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const salt = await fetchSalt(email);
      if (!salt)
        throw new Error('Unable to verify your account. Please try again.');

      const hashedPassword = hashPassword(masterPassword, salt);
      const response = await login(email, hashedPassword);

      if (response.status === 200) {
        setMasterPassword(masterPassword);
        setEmail(email);
        navigate('/credential-dashboard');
        setMasterPasswordState('');
        setUserEmail('');
      } else {
        setError({ form: 'Invalid email or password.' });
      }
    } catch (error) {
      setError({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setUserEmail,
    masterPassword,
    setMasterPasswordState,
    error,
    isLoading,
    handleSubmit,
  };
};
