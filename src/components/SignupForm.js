import React, { useState } from 'react';

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
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
                    onChange={(e) => setMasterPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
