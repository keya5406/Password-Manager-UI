import React, { useState } from 'react';
import { useMasterPassword } from '../Context/MasterPasswordContext';
import { useEmail } from '../Context/EmailContext';
import useHandleSubmit from './useHandleSubmit';
import Button from '../UI/Button';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const CredentialForm = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { masterPassword } = useMasterPassword();
  const { email } = useEmail();
  const { handleSubmit, formErrors } = useHandleSubmit(masterPassword);

  const resetForm = () => {
    setServiceName('');
    setUsername('');
    setPassword('');
  };

  return (
    <section className="flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Securely store and manage your passwords
      </h2>
      <form
        id="passwordForm"
        onSubmit={e =>
          handleSubmit(e, serviceName, username, password, resetForm, email)
        }
        className="space-y-4"
      >
        <FormInput
          label="Service Name"
          id="service-name"
          name="service-name"
          placeholder="e.g., Gmail"
          value={serviceName}
          onChange={e => setServiceName(e.target.value)}
          errorMessage={formErrors.serviceName}
        />
        <FormInput
          label="Username"
          id="username"
          name="username"
          placeholder="e.g., user123"
          value={username}
          onChange={e => setUsername(e.target.value)}
          errorMessage={formErrors.username}
        />
        <div className="relative">
          <FormInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            errorMessage={formErrors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <Button type="submit" text="Add Password">
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            style={{ width: '24px', height: '24px' }}
          />
        </Button>
      </form>

      <Button
        type="button"
        text="Manage Passwords"
        onClick={() => navigate('/credential-dashboard')}
        className="mt-4"
      />
    </section>
  );
};

export default CredentialForm;
