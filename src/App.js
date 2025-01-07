import React from 'react';
import './App.css';
import './styles/output.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/Common/NavBar';
import CredentialForm from './components/Credential/CredentialForm';
import Footer from './components/Common/Footer';
import SignupForm from './components/Auth/SignupForm';
import { MasterPasswordProvider } from './components/Context/MasterPasswordContext';
import { EmailProvider } from './components/Context/EmailContext';
import LoginForm from './components/Auth/LoginForm';
import CredentialDashboard from './components/Credential/CredentialDashboard';
import EditCredential from './components/Credential/EditCredential';
import LandingPage from './components/Common/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <EmailProvider>
      <MasterPasswordProvider>
        <div className="bg-blue-100 min-h-screen flex flex-col">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/loginForm" element={<LoginForm />} />
              <Route path="/credentialForm" element={<CredentialForm />} />
              <Route
                path="/credential-dashboard"
                element={<CredentialDashboard />}
              />
              <Route path="/edit-credential/:id" element={<EditCredential />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer />
            <Footer />
          </Router>
        </div>
      </MasterPasswordProvider>
    </EmailProvider>
  );
}

export default App;
