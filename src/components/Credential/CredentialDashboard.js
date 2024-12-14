import React, { useEffect, useState } from "react";
import { fetchCredentials } from "./CredentialApi.js";
import { useCredentialDecryption } from "./Decryption.js";
import CredentialsList from "./CredentialList.js";
import { useMasterPassword } from "../Context/MasterPasswordContext.js";

const CredentialDashboard = () => {
    const [credentials, setCredentials] = useState([]);
    const { masterPassword } = useMasterPassword();
    const { decryptCredential } = useCredentialDecryption();

    useEffect(() => {
        const loadCredentials = async () => {
            if (!masterPassword) return;

            try {
                const encryptedData = await fetchCredentials();
                const decryptedCredentials = await Promise.all(
                    encryptedData.map(async (credential) => ({
                        serviceName: await decryptCredential(credential.serviceName, masterPassword),
                        username: await decryptCredential(credential.username, masterPassword),
                        password: await decryptCredential(credential.password, masterPassword),
                    }))
                );
                setCredentials(decryptedCredentials);
            } catch (error) {
                console.error("Error loading credentials:", error);
            }
        };

        loadCredentials();
    }, [masterPassword, decryptCredential]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Password Library</h1>
            <CredentialsList credentials={credentials} />
        </div>
    );
};

export default CredentialDashboard;