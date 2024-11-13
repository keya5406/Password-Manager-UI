import React from 'react';

const Button = ({ text, onClick, type = 'button'}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-900 transition duration-200 mt-4"
        >
            {text}
        </button>
    );
};

export default Button;
