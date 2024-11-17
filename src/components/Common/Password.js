import React from 'react';

const Password = ({ value, onChange, error }) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="masterPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Master Password:
            </label>
            <input
                type="password"
                id="masterPassword"
                placeholder="Enter Master-password"
                value={value}
                onChange={onChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Password;
