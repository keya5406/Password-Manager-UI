import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const SuccessMessage = ({ message }) => {
  if (!message) {
    return <p className="text-red-500">Error: No message provided!</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
        <AiOutlineCheckCircle size={80} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-green-600">{message}</h2>
      <p className="text-gray-600">Redirecting to the login page...</p>
    </div>
  );
};

export default SuccessMessage;
