import React, { useState, useEffect } from "react";
import { useCredentialDecryption } from "./Decryption";
import { useMasterPassword } from "../Context/MasterPasswordContext";
import FormInput from "./FormInput";
import Button from "../UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useKeyGenerator } from "./keyGenerator";
import CryptoJS from "crypto-js";

const EditCredential = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { masterPassword } = useMasterPassword();
    const { generateKeyFromMasterPassword } = useKeyGenerator();
    const { decryptCredential } = useCredentialDecryption();

    const [serviceName, setServiceName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const fetchCredential = async () => {
            try {
                if (!id) {
                    throw new Error("Credential ID is missing");
                }
                if (!masterPassword) {
                    throw new Error("Master password is required to decrypt the data.");
                }

                const response = await fetch(`/api/credentials/${id}`);
                if (response.status === 404) {
                    throw new Error("Credential not found");
                }
                if (!response.ok) {
                    throw new Error(`Error fetching credential: ${response.status}`);
                }

                const data = await response.json();
                if (!data.password || !data.serviceName || !data.username) {
                    throw new Error("Incomplete data received from the server");
                }


                const decryptedServiceName = await decryptCredential(data.serviceName, masterPassword);
                const decryptedUsername = await decryptCredential(data.username, masterPassword);
                const decryptedPassword = await decryptCredential(data.password, masterPassword);

                setServiceName(decryptedServiceName.toString(CryptoJS.enc.Utf8));
                setUsername(decryptedUsername.toString(CryptoJS.enc.Utf8));
                setPassword(decryptedPassword.toString(CryptoJS.enc.Utf8));

                setFetched(true);
            } catch (error) {
                console.error("Failed to fetch or decrypt credential", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!fetched && loading) {
            fetchCredential();
        }
    }, [id, masterPassword, generateKeyFromMasterPassword, fetched, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!masterPassword) {
            console.error("Master password is required to encrypt data");
            setError("Master password is required to encrypt data.");
            return;
        }

        try {
            const encryptionKey = await generateKeyFromMasterPassword(masterPassword);
            const encryptedServiceName = CryptoJS.AES.encrypt(serviceName, encryptionKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            const updatedCredential = {
                serviceName: encryptedServiceName,
                username: encryptedUsername,
                password: encryptedPassword,
            };

            const response = await fetch(`/api/credentials/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCredential),
            });

            if (response.ok) {
                navigate("/credential-dashboard");
            } else {
                throw new Error("Failed to update credential");
            }
        } catch (error) {
            console.error("Error updating credential:", error);
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <section className="flex-grow w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 bg-blue-50 rounded-lg shadow-lg mt-20 space-y-0">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Edit Credential</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Service Name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    id="service-name"
                    name="serviceName"
                    placeholder="Enter Service Name"
                />

                <FormInput
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                />

                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                />

                <Button type="submit" text="Update Credential" />
            </form>
            <Button type="button" text="Cancel" onClick={() => navigate("/credential-dashboard")} />
        </section>
    );
};

export default EditCredential;
