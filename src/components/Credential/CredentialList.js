import React from "react";
import { PiUserListFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { handleDelete } from './handleDelete';

const CredentialsList = ({ credentials, setCredentials}) => {
  console.log("Received Credentials:", credentials);
  const navigate = useNavigate();

  const handleEditClick = (credentialId) => {
    navigate(`/edit-credential/${credentialId}`);
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <PiUserListFill className="w-10 h-10 mr-4" />
        <span>My Passwords</span>
      </h2>

      {credentials.length === 0 ? (
        <p className="text-gray-500 text-lg">No credentials saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <div
              key={credential.id}
              className="p-6 bg-blue-50 bg-opacity-70 rounded-2xl shadow-lg border border-blue-200 transition-transform transform hover:scale-105 "
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                {credential.serviceName}
              </h3>

              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Username: </span>
                {credential.username}
              </p>

              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Password: </span>
                {credential.password}
              </p>

              <button
                className="text-blue-900 hover:text-gray-700"
                onClick={() => handleEditClick(credential.id)}
              >
                <AiFillEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-500 hover:text-red-700 ml-3"
                onClick={() => handleDelete(credential.id, setCredentials)} 
                >
                <AiOutlineDelete className="w-5 h-5" />
              </button>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CredentialsList;
