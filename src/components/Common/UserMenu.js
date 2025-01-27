import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../Context/EmailContext';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from './DeleteUser';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useEmail();
  const { setEmail } = useEmail();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setEmail(null);
    setIsOpen(false);

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('encryptedMasterPassword');

    toast.success('Logged out successfully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      style: {
        backgroundColor: '#eff6ff',
        color: '#1e3a8a',
        borderRadius: '8px',
        padding: '16px',
      },
    });
    navigate('/loginForm');
  };

  const handleNavigateToDashboard = () => {
    setIsOpen(false);
    navigate('/credential-dashboard');
  };

  if (!email) return null;

  return (
    <div className="relative inline-block text-left ml-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-1 bg-blue-300 bg-opacity-50 rounded-full "
      >
        <HiOutlineUserCircle className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-max bg-blue-100 border rounded-md shadow-lg">
          <button
            onClick={handleNavigateToDashboard}
            className="px-4 py-2 text-gray-800 border-b text-left hover:bg-blue-200 w-full"
          >
            {email}
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
          >
            Log Out
          </button>
          <DeleteUser />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
