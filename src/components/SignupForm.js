import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import Email from './Email';
import Password from './Password';
import Button from './Button';
import axios from 'axios';


const SignupForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [error, setError] = useState({});


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    const generateSalt = () => {
        return CryptoJS.lib.WordArray.random(128 / 8).toString();
    };

    const hashPassword = (password, salt) => {
        return CryptoJS.PBKDF2(password, salt, {
            keySize: 256 / 32,
            iterations: 1000,
        }).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        setError(newErrors);

        if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!masterPassword) {
            newErrors.password = 'Password is required.';
        } else if (!passwordPattern.test(masterPassword)) {
            newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        const salt = generateSalt();
        const hashedPassword = hashPassword(masterPassword, salt);

       
        try {
            const response = await axios.post('/api/register', {
                email: email,
                hashedPassword: hashedPassword,
                salt: salt,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            });
            
            console.log('Response:', response.data);

            navigate('/loginForm');
        } catch (err) {
            console.error('Error during signup:', err);
            setError({ api: 'Signup failed. Please try again.' });
        }


        setEmail('');
        setMasterPassword('');
    };

    const handleNavigateToLogin = () => {
        navigate('/loginForm');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-blue-50 flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <Email value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
                <Password value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} error={error.password} />
                
               
                <Button text="Sign Up" type="submit" />
            </form>

          
            <div className="mt-1 text-center">
                <Button text="Already have an account? Log In" onClick={handleNavigateToLogin} type="button" />
            </div>
        </div>
    );
};


export default SignupForm;
