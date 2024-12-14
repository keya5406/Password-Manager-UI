import CryptoJS from "crypto-js";
import { useKeyGenerator } from "./keyGenerator";

export const useCredentialDecryption = () => {
  const { generateKeyFromMasterPassword, fetchSalt } = useKeyGenerator();


  const decryptCredential = async (encryptedData, masterPassword) => {
    try {
      if (!encryptedData || typeof encryptedData !== "string") {
        throw new Error("Invalid encrypted data.");
      }

      const salt = await fetchSalt();

      const key = await generateKeyFromMasterPassword(masterPassword);

      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error("Decryption failed: Invalid or corrupted data.");
      }

      return decryptedText;
    } catch (error) {
      console.error("Decryption error:", error.message || error);
      throw error;
    }
  };

  return { decryptCredential };
};
