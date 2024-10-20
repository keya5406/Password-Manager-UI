import React, { useState } from 'react';

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [error, setError] = useState({});


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        setError(newErrors);

        if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!masterPassword) {
            newErrors.password = 'Password is required.';
        } else if (!passwordPattern.test(masterPassword)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        console.log('Email:', email);
        console.log('Master password;', masterPassword);

        setEmail('');
        setMasterPassword('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-blue-50flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email-Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
            </div>

            <div className="mb-6">
                <label
                    htmlFor="masterPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Master Password:
                </label>
                <input
                    type="password"
                    id="masterPassword"
                    value={masterPassword}
                    placeholder="Enter Master-password"
                    onChange={(e) => setMasterPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            </div>



            <button
                type="submit"
                className="w-full py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-900 transition duration-200 mt-4"
            >
                Sign Up
            </button>

        </form>
    );
};

export default SignupForm;
