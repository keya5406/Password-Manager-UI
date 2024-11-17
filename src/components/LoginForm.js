import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import Email from './Email';
import Password from './Password';
import Button from './Button';
import axios from 'axios';
import { useMasterPassword } from './MasterPasswordContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setMasterPassword } = useMasterPassword();
    
    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPasswordState] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const fetchSalt = async () => {
        try {
            console.log("Fetching salt for email:", email); 
            const response = await axios.get('/api/salt', { params: { email } });
            console.log("API response data:", response.data);
            
            const salt = response.data?.Salt; 
            console.log("Salt fetched:", salt, "Type of salt:", typeof salt);
            return salt;
        } catch (error) {
            console.error("Error fetching salt:", error);
            setError({ form: 'Could not retrieve salt. Please try again.' });
            return null;
        }
    };

    const hashPassword = (password, salt) => {
        const hashedPassword = CryptoJS.PBKDF2(password, salt, {
            keySize: 256 / 32,
            iterations: 1000,
        }).toString();
        console.log("Hashed Password:", hashedPassword); 
        return hashedPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        const newErrors = {};

        if (!isValidEmail(email)) {
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
            console.log("Salt not found or empty.");
            return;
        }
            const hashedPassword = hashPassword(masterPassword, salt);

        try {
            const response = await axios.post('/api/login', {
                email,
                hashedPassword,
            });

            if (response.status === 200) {
                setMasterPassword(masterPassword);
                navigate('/credentialForm');
                setEmail('');
                setMasterPasswordState('');
            } else {
                setError({ form: 'Invalid email or password.' });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setError({ form: 'Authentication failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-blue-50 flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

            <Email value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
            <Password value={masterPassword} onChange={(e) => setMasterPasswordState(e.target.value)} error={error.password} />
            <Button text={isLoading ? "Logging In..." : "Log In"} disabled={isLoading} />
            {error.form && <p className="text-red-500 mt-4">{error.form}</p>}
        </form>
    );
};

export default LoginForm;

