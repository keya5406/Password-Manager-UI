import React, { useEffect, useState } from 'react';
import { fetchCredentials } from './CredentialApi.js';
import CredentialsList from './CredentialList.js';
import { useMasterPassword } from '../Context/MasterPasswordContext.js';
import { useEmail } from '../Context/EmailContext.js';

const CredentialDashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { masterPassword } = useMasterPassword();
  const { email } = useEmail();

  useEffect(() => {
    const loadCredentials = async () => {
      setLoading(true);

      if (!masterPassword || !email) {
        return;
      }

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
      } finally {
        setLoading(false);
      }
    };

    loadCredentials();
  }, [masterPassword, email]);



  return (
    <div className="p-8">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <CredentialsList credentials={credentials} setCredentials={setCredentials} loading={loading} />
      )}
    </div>
  );
};

export default CredentialDashboard;
