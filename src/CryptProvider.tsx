import React, { createContext, useContext, useMemo } from "react";

interface ContextProps {
  secretKey: string;
}

interface ProviderProps extends ContextProps {
  children: React.ReactNode;
}

const CryptContext = createContext<ContextProps>(null!);

const CryptProvider = ({ secretKey, children }: ProviderProps) => {
  const contextValue = useMemo(
    () => ({
      secretKey,
    }),
    [secretKey]
  );

  return (
    <CryptContext.Provider value={contextValue}>
      {children}
    </CryptContext.Provider>
  );
};

export const useCryptProvider = () => {
  const context = useContext(CryptContext);

  if (!context) {
    throw new Error("useCryptStorage hook must be used within CryptProvider");
  }
  return context;
};

export default CryptProvider;
