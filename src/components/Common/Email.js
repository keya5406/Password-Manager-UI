import React from 'react';

const Email = ({ value, onChange, error }) => {
  return (
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
        placeholder="Enter your email-Id"
        value={value}
        onChange={onChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Email;
