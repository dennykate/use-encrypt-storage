import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

import { useEncryptProvider } from "../EncryptProvider";

const useEncryptStorage = () => {
  const { secretKey } = useEncryptProvider();

  const set = useCallback(
    (key: string, value: string, expires: number | undefined = undefined) => {
      const encryptedValue = AES.encrypt(value, secretKey).toString();

      localStorage.setItem(key, encryptedValue);

      if (expires) {
        const expirationTimestamp = Date.now() + expires * 60 * 1000;
        localStorage.setItem(
          `${key}_expiration`,
          expirationTimestamp.toString()
        );
      }
    },
    [secretKey]
  );

  const get = useCallback(
    (key: string) => {
      const value = localStorage.getItem(key);
      const expirationTimestamp = localStorage.getItem(`${key}_expiration`);

      if (!value) return null;

      if (
        expirationTimestamp &&
        Date.now() > parseInt(expirationTimestamp, 10)
      ) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expiration`);
        return null;
      }

      const decryptedValue = AES.decrypt(value, secretKey).toString(
        CryptoJS.enc.Utf8
      );

      return decryptedValue;
    },
    [secretKey]
  );

  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return { set, get, remove };
};

export default useEncryptStorage;
