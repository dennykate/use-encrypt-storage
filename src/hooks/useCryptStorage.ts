import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

import { useCryptProvider } from "../CryptProvider";

const useCryptStorage = () => {
  const { secretKey } = useCryptProvider();

  const set = useCallback(
    (key: string, value: string, expires: number | undefined = undefined) => {
      const encryptedValue = AES.encrypt(value, secretKey).toString();

      localStorage.setItem(key, encryptedValue);

      if (expires) {
        const expirationTimestamp = Date.now() + expires * 24 * 60 * 60 * 1000;
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

      if (!value) throw new Error("Invalid key");

      if (
        expirationTimestamp &&
        Date.now() > parseInt(expirationTimestamp, 10)
      ) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expiration`);
        throw new Error("Expired key");
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

export default useCryptStorage;
