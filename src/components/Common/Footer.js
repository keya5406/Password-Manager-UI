import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 p-4 bg-blue-100 bg-opacity-50 text-center h-16 py-4">
      <p>© {currentYear} Password Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
