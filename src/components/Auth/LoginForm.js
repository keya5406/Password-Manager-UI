import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';
import Email from '../Common/Email';
import Password from '../Common/Password.js';
import Button from '../UI/Button.js';
import Loader from '../UI/Loader';

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        email,
        setEmail,
        masterPassword,
        setMasterPassword,
        error,
        isLoading,
        handleSubmit,
    } = useLogin(navigate);

    
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-blue-50 flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

            <Email value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
            <Password value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} error={error.password} />
            {isLoading ? <Loader /> : <Button text="Log In" type="submit" />}
            {error.form && <p className="text-red-500 mt-4">{error.form}</p>}
        </form>
    );
};

export default LoginForm;
