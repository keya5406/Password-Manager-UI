import CryptoJS from "crypto-js";
import axios from "axios";
import { useEmail } from "../Context/EmailContext";

export const useKeyGenerator = () => {
  const { email } = useEmail();


  const fetchSalt = async () => {
    if (!email) {
      throw new Error("Email is required to fetch salt.");
    }
    try {
      const response = await axios.get("/api/salt", { params: { email } });
      if (!response.data?.Salt) {
        throw new Error("Salt not found in response.");
      }
      return response.data.Salt;
    } catch (error) {
      console.error("Failed to fetch salt from the backend:", error);
      throw error;
    }
  };


  const generateKeyFromMasterPassword = async (masterPassword) => {
    try {
      const salt = await fetchSalt();
      const parsedSalt = CryptoJS.enc.Hex.parse(salt);
      
      const key = CryptoJS.PBKDF2(masterPassword, parsedSalt, {
        keySize: 256 / 32,
        iterations: 1000,
      });

      return key;
    } catch (error) {
      console.error("Error generating key:", error);
      throw error;
    }
  };

  return { generateKeyFromMasterPassword };
};
