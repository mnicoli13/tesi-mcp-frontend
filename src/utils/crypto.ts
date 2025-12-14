import CryptoJS from "crypto-js";

/**
 * Cripta una stringa usando AES con la chiave segreta dall'environment
 * @param text - Il testo da criptare
 * @returns Il testo criptato in formato base64
 */
export const encryptPassword = (text: string): string => {
  const secretKey = import.meta.env.VITE_CRYPTO_ESSE3_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "VITE_CRYPTO_ESSE3_SECRET_KEY non configurata nel file .env"
    );
  }

  // Cripta usando AES
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();

  return encrypted;
};

/**
 * Decripta una stringa criptata con AES
 * @param encryptedText - Il testo criptato in formato base64
 * @returns Il testo decriptato
 */
export const decryptPassword = (encryptedText: string): string => {
  const secretKey = import.meta.env.VITE_CRYPTO_ESSE3_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "VITE_CRYPTO_ESSE3_SECRET_KEY non configurata nel file .env"
    );
  }

  // Decripta usando AES
  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);

  return decrypted.toString(CryptoJS.enc.Utf8);
};
