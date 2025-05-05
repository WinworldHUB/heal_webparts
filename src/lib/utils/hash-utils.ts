import CryptoJS from "crypto-js";
import { ENCODER_SECRET_KEY } from "../constants";

export const EncodeBase64Aes = (data: string): string => {
  const key = CryptoJS.enc.Utf8.parse(ENCODER_SECRET_KEY);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();
  return `${iv.toString(CryptoJS.enc.Base64)}:${encrypted}`;
};

export const DecodeBase64Aes = (encryptedData: string): string => {
  const [ivBase64, encrypted] = encryptedData.split(":");
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const key = CryptoJS.enc.Utf8.parse(ENCODER_SECRET_KEY);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const getEncodedJson = (data: unknown): string =>
  JSON.stringify({
    data: EncodeBase64Aes(JSON.stringify(data)),
  });