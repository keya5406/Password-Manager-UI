import React from 'react';
import { useNavigate } from 'react-router-dom';
import Email from './Email';
import Password from './Password';
import Button from './Button';
import Loader from './Loader';
import useSignupForm from './useSignupForm';
import SuccessMessage from './SuccessMessage';


const SignupForm = () => {
    const navigate = useNavigate();
    const { email, setEmail, masterPassword, setMasterPassword, error, isLoading, isSuccess, handleSubmit } = useSignupForm(navigate);


    return (
        <div className="max-w-md mx-auto p-6 bg-blue-50 flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0">
            {isSuccess ? (
                <SuccessMessage message="Account Created Successfully!" />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                    <Email value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
                    <Password value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} error={error.password} />


                    {isLoading ? <Loader /> : <Button text="Sign Up" type="submit" />}
                </form>
            )}

            {!isSuccess && (
                <div className="mt-1 text-center">
                    <Button text="Already have an account? Log In" onClick={() => navigate('/loginForm')} type="button" />
                </div>
            )}
        </div>
    );
};


export default SignupForm;
