import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../Context/EmailContext';
import { HiOutlineUserCircle } from "react-icons/hi";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { email } = useEmail();
    const { setEmail } = useEmail()
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setEmail(null);
        setIsOpen(false);
        alert("Logged out successfully");
        navigate("/loginForm");
    };

    if (!email) return null;

    return (
        <div className="relative inline-block text-left ml-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center p-1 bg-blue-300 rounded-full "
            >
                <HiOutlineUserCircle  className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 min-w-max bg-blue-100 border rounded-md shadow-lg">
                    <div className="px-4 py-2 text-gray-800 border-b">{email}</div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
