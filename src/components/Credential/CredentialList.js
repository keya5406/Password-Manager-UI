import React, { useState } from 'react';
import { PiUserListFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useCredentialDecryption } from './Decryption';
import { useMasterPassword } from '../Context/MasterPasswordContext.js';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
  AiFillEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import { handleDelete } from './handleDelete';

const CredentialsList = ({ credentials, setCredentials, loading }) => {
  const navigate = useNavigate();
  const { decryptCredential } = useCredentialDecryption();
  const { masterPassword } = useMasterPassword();
  const [expandedServices, setExpandedServices] = useState([]);
 
  
  const handleEditClick = credentialId => {
    navigate(`/edit-credential/${credentialId}`);
  };

  const handleToggle = async id => {
    if (expandedServices.includes(id)) {
      setExpandedServices(prevExpanded =>
        prevExpanded.filter(serviceId => serviceId !== id)
      );
    } else {
     
      const updatedCredentials = await Promise.all(
        credentials.map(async credential => {
          if (credential.id === id && !credential.decrypted) {
            const decryptedUsername = await decryptCredential(
              credential.encryptedUsername,
              masterPassword
            );
            const decryptedPassword = await decryptCredential(
              credential.encryptedPassword,
              masterPassword
            );
            return {
              ...credential,
              username: decryptedUsername,
              password: decryptedPassword,
              decrypted: true,
            };
          }
          return credential;
        })
      );
      setCredentials(updatedCredentials);
      setExpandedServices(prevExpanded => [...prevExpanded, id]);
    
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-blue-100 rounded-xl shadow-xl mt-6 sm:mt-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 flex flex-wrap items-center">
        <PiUserListFill className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4" />
        <span className="text-lg sm:text-xl">My Passwords</span>

        <div className="ml-auto mt-2 sm:mt-0">
          <button
            className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 bg-blue-300 hover:bg-blue-400 bg-opacity-50 rounded-lg text-xs sm:text-sm md:text-base flex items-center gap-2 transition-colors"
            onClick={() => navigate('/credentialForm')}
          >
            <AiOutlinePlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Password</span>
          </button>
        </div>
      </h2>

      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {credentials.length === 0 && (
        <p className="text-gray-500 text-lg">No credentials saved yet.</p>
      )}

      {!loading && credentials.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map(credential => (
            <div key={credential.id} className="p-3 bg-blue-50 bg-opacity-70 rounded-2xl shadow-lg border border-blue-200 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
                <span>{credential.serviceName}</span>
                <button
                  className="text-blue-700 hover:text-blue-900"
                  onClick={() => handleToggle(credential.id)}
                >
                  {expandedServices.includes(credential.id) ? (
                    <AiOutlineEyeInvisible className="w-7 h-7" />
                  ) : (
                    <AiOutlineEye className="w-7 h-7" />
                  )}
                </button>
              </h3>
              {expandedServices.includes(credential.id) && (
                <>
                  <p className="text-gray-700 mb-2 break-words">
                    <span className="font-semibold">Username: </span>
                    {credential.username}
                  </p>
                  <p className="text-gray-700 mb-4 break-words">
                    <span className="font-semibold">Password: </span>
                    {credential.password}
                  </p>
                  <div className="flex space-x-3 mb-3">
                    <button
                      className="text-blue-900 hover:text-gray-700"
                      onClick={() => handleEditClick(credential.id)}
                    >
                      <AiFillEdit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(credential.id, setCredentials)}
                    >
                      <AiOutlineDelete className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CredentialsList;
