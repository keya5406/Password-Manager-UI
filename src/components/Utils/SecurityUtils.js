import CryptoJS from 'crypto-js';


export const generateEncryptionKey = (email, salt) => {
   const derivedKey = CryptoJS.PBKDF2(email + salt, salt, { keySize: 256 / 32 }); 
  return derivedKey.toString(); 
};

export const encryptPassword = (password, key) => {
  const encryptedPassword = CryptoJS.AES.encrypt(password, key, { mode: CryptoJS.mode.ECB }).toString();
  return encryptedPassword;
};

export const decryptPassword = (encryptedPassword, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, key, { mode: CryptoJS.mode.ECB });
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};
