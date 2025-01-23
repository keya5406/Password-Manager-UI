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

const CredentialsList = ({ credentials, setCredentials }) => {
  const navigate = useNavigate();
  const { decryptCredential } = useCredentialDecryption();
  const { masterPassword } = useMasterPassword();
  const [expandedServices, setExpandedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEditClick = credentialId => {
    navigate(`/edit-credential/${credentialId}`);
  };

  const handleToggle = async id => {
    if (expandedServices.includes(id)) {
      setExpandedServices(prevExpanded =>
        prevExpanded.filter(serviceId => serviceId !== id)
      );
    } else {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <PiUserListFill className="w-10 h-10 mr-4" />
        <span>My Passwords</span>

        <div className="ml-auto">
          <button
            className="px-4 py-2 bg-blue-300 hover:bg-blue-400 bg-opacity-50 rounded-lg text-sm flex items-center gap-2 transition-colors"
            onClick={() => navigate('/credentialForm')}
          >
            <AiOutlinePlus className="w-5 h-5" />
            <span>Add Password</span>
          </button>
        </div>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : credentials.length === 0 ? (
        <p className="text-gray-500 text-lg">No credentials saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map(credential => (
            <div
              key={credential.id}
              className="p-3 bg-blue-50 bg-opacity-70 rounded-2xl shadow-lg border border-blue-200 transition-transform transform hover:scale-105 "
            >
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
                  <p className="text-gray-700  mb-2  break-words">
                    <span className="font-semibold">Username: </span>
                    {credential.username}
                  </p>

                  <p className="text-gray-700  mb-4  break-words">
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
                      onClick={() =>
                        handleDelete(credential.id, setCredentials, setLoading)
                      }
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
