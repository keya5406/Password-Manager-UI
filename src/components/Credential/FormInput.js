import React from 'react';

const FormInput = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
