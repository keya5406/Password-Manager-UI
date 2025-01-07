import { useState } from 'react';
import { registerUser } from './api';
import { generateSalt, hashPassword, isValidEmail, passwordPattern } from '../Utils/cryptoUtils';

const useSignupForm = (navigate) => {
    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!masterPassword) {
            newErrors.password = 'Password is required.';
        } else if (!passwordPattern.test(masterPassword)) {
            newErrors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        }

        if (masterPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.'; 
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        setIsLoading(true);
        const salt = generateSalt();
        const hashedPassword = hashPassword(masterPassword, salt);

        try {
            await registerUser(email, hashedPassword, salt);
            setIsSuccess(true);  
            setTimeout(() => navigate('/loginForm'), 3000);  
        } catch (err) {
            console.error('Error during signup:', err);

            if (err.response) {
                if (err.response.status === 409) {
                    setError({ email: 'This email is already registered. Please use a different email or log in.' });
                } else if (err.response.status === 400) {
                    setError({ api: 'Invalid data. Please check your input and try again.' });
                } else if (err.response.status === 500) {
                    setError({ api: 'Internal server error. Please try again later.' });
                } else if (err.response.data && err.response.data.error) {
                    setError({ api: err.response.data.error });
                } else {
                    setError({ api: 'Signup failed. Please try again.' });
                }
            } else {
                setError({ api: 'Network error. Please check your internet connection.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        masterPassword,
        setMasterPassword,
        confirmPassword, 
        setConfirmPassword, 
        error,
        isLoading,
        isSuccess,  
        handleSubmit,
    };
};

export default useSignupForm;
