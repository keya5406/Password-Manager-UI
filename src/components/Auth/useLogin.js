import { useState } from 'react';
import { loginUser } from './loginApi'; 
import { hashPassword } from '../Utils/cryptoUtils'; 

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        const newErrors = {};

        if (!email || !isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!masterPassword) {
            newErrors.password = 'Password is required.';
        } else if (masterPassword.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setIsLoading(false);
            return;
        }

        const salt = await fetchSalt();
        if (!salt) {
            setIsLoading(false);
            return;
        }

        const hashedPassword = hashPassword(masterPassword, salt);

        const loginSuccess = await loginUser(email, hashedPassword, setError);

        if (loginSuccess) {
            setEmail('');
            setMasterPassword('');
        } else {
            setIsLoading(false);
        }
    };

   
    const fetchSalt = async () => {
        try {
            const response = await axios.get('/api/salt', { params: { email } });
            return response.data?.Salt;
        } catch (error) {
            setError({ form: 'Could not retrieve salt. Please try again.' });
            return null;
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return {
        email,
        masterPassword,
        error,
        isLoading,
        setEmail,
        setMasterPassword,
        handleSubmit,
    };
};

export default useLogin;
