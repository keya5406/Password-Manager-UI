import React from 'react';

const Button = ({ text }) => {
    return (
        <button
            type="submit"
            className="w-full py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-900 transition duration-200 mt-4"
        >
            {text}
        </button>
    );
};

export default Button;
