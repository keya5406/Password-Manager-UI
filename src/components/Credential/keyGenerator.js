import CryptoJS from 'crypto-js';

export const generateKeyFromMasterPassword = (masterPassword) => {
  const salt = sessionStorage.getItem('salt') || CryptoJS.lib.WordArray.random(128 / 8);
  sessionStorage.setItem('salt', salt.toString());
  const key = CryptoJS.PBKDF2(masterPassword, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  });
  return key;
};
