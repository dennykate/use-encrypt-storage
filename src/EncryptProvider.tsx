import React, { createContext, useContext, useMemo } from "react";

interface ContextProps {
  secretKey: string;
}

interface ProviderProps extends ContextProps {
  children: React.ReactNode;
}

const EncryptContext = createContext<ContextProps>(null!);

const EncryptProvider = ({ secretKey, children }: ProviderProps) => {
  const contextValue = useMemo(
    () => ({
      secretKey,
    }),
    [secretKey]
  );

  return (
    <EncryptContext.Provider value={contextValue}>
      {children}
    </EncryptContext.Provider>
  );
};

export const useEncryptProvider = () => {
  const context = useContext(EncryptContext);

  if (!context) {
    throw new Error("useCryptStorage hook must be used within CryptProvider");
  }
  return context;
};

export default EncryptProvider;
