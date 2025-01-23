import React, { useEffect, useState } from 'react';
import { fetchCredentials } from './CredentialApi.js';
import CredentialsList from './CredentialList.js';
import { useMasterPassword } from '../Context/MasterPasswordContext.js';
import { useEmail } from '../Context/EmailContext.js';

const CredentialDashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const { masterPassword } = useMasterPassword();
  const { email } = useEmail();

  useEffect(() => {
    const loadCredentials = async () => {
      if (!masterPassword || !email) return;
      try {
        const encryptedData = await fetchCredentials(email);
        const credentialsWithEncryptedData = encryptedData.map(credential => ({
          id: credential.id,
          serviceName: credential.serviceName,
          encryptedUsername: credential.username,
          encryptedPassword: credential.password,
        }));
        setCredentials(credentialsWithEncryptedData);

       
      } catch (error) {
        console.error('Error loading credentials:', error);
      }
    };
    loadCredentials();
  }, [masterPassword, email]);

  return (
    <div className="p-8">
      <CredentialsList
        credentials={credentials}
        setCredentials={setCredentials}
      />
    </div>
  );
};

export default CredentialDashboard;
