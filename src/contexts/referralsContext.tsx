// contexts/referralsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Create a Context
const ReferralsContext = createContext({});

// Define a provider component
export const ReferralsProvider = ({ children }: { children: ReactNode }) => {
  const [referrals, setReferrals] = useState([]); // Shared state

  return (
    <ReferralsContext.Provider value={{ referrals, setReferrals }}>
      {children}
    </ReferralsContext.Provider>
  );
};

// Custom hook to use the ReferralsContext
export const useReferrals = () => {
  return useContext(ReferralsContext) as {
    referrals: [];
    setReferrals: React.Dispatch<React.SetStateAction<any>>;
  };
};
