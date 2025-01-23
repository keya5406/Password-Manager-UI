import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../Context/EmailContext';

const DeleteUser = () => {
  const { email } = useEmail();
  const { setEmail } = useEmail();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will deactivate your account permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'bg-blue-50 text-blue-800',
        confirmButton: 'bg-blue-600 text-white',
        cancelButton: 'bg-gray-300 text-gray-800',
      },
    });

    if (isConfirmed) {
      const apiUrl = config.apiUrl;
      setLoading(true);
      try {
                const response = await fetch(`${apiUrl}/api/softDelete?email=${email}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          toast.success('Account deactivated successfully', {
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
            },
          });

         
          localStorage.removeItem('userToken');
          setEmail(null);
          navigate('/');
        } else {
          toast.error('Failed to deactivate the account', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            style: {
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
            },
          });
        }
      } catch (error) {
        console.error('Error deactivating account:', error);
        toast.error('Error deactivating account', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          style: {
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="my-6">
      <button
        onClick={handleDeleteAccount}
        className="px-4 py-2 text-red-600 hover:bg-red-100 bg-blue-100 font-bold w-full"
      >
        {loading ? 'Processing...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default DeleteUser;
