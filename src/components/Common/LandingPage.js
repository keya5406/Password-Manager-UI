import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEmail } from '../Context/EmailContext';
import hero from '../Assets/hero.jpg';

const LandingPage = () => {
  const location = useLocation();
  const { email } = useEmail();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="bg-blue-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 text-center md:text-left md:flex md:items-center md:justify-between rounded-lg">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">
            Secure Your Digital Life
          </h2>
          <p className="mb-6 text-gray-600">
            Manage all your passwords effortlessly with our zero-knowledge
            encryption technology.
          </p>
          <div className="space-x-4">
          <Link
              to={email ? '/credential-dashboard' : '/signup'} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="text-blue-900 underline hover:text-blue-600"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-2/3">
          <img
            src={hero}
            alt="Password Manager Illustration"
            className="w-full rounded-lg "
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-blue-50 rounded-lg mt-12">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Features
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Secure Storage</h4>
            <p>
              Keep all your credentials safe with military-grade encryption.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Easy Access</h4>
            <p>Access your passwords from any device, anywhere.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">
              Zero-Knowledge Encryption
            </h4>
            <p>Your data remains private, even from us.</p>
          </div>
        </div>
      </section>

      {/* Home Section */}
      <section
        id="home"
        className="py-16 px-6 bg-blue-100 text-center rounded-lg mt-12"
      >
        <h3 className="text-3xl font-bold mb-10 text-gray-900">
          Welcome to PassEZ
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Manage your passwords securely with our simple, effective solution.
          Our app gives you peace of mind with cutting-edge encryption and easy
          access.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-blue-50 text-center rounded-lg mt-12">
        <h3 className="text-3xl font-bold mb-10 text-gray-900">
          What Our Users Say
        </h3>
        <p className="text-gray-500 italic">"Coming soon..."</p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-6 bg-blue-100 text-center rounded-lg mt-12"
      >
        <h3 className="text-3xl font-bold mb-10 text-gray-900">Contact Us</h3>
        <p className="text-lg text-gray-600 mb-6">
          Have questions? We're here to help!
        </p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=keya01127@gmail.com"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          target="_blank"
        >
          Contact Support
        </a>
      </section>
    </div>
  );
};

export default LandingPage;
