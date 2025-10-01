import CryptoJS from "crypto-js";

export const decryptToken = (token: string, encryptionKey: string) => {
  // Decode Base64 back to ciphertext
  const encryptedData = CryptoJS.enc.Base64.parse(token);

  // Derive IV: first 16 bytes of SHA256(encryptionKey)
  const iv = CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(encryptionKey).toString().substring(0, 32) // 16 bytes (32 hex chars)
  );

  // Decrypt
  const decrypted = CryptoJS.AES.decrypt(
    encryptedData.toString(CryptoJS.enc.Base64), // Convert WordArray to string
    CryptoJS.enc.Utf8.parse(encryptionKey),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}
