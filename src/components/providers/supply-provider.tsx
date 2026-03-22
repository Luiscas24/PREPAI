'use client';

import { supply as initialSupplyData } from '@/lib/data';
import { Supply } from '@/lib/types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SupplyContextType {
  supply: Supply;
  setPills: (pills: number) => void;
}

const SupplyContext = createContext<SupplyContextType | undefined>(undefined);

export function SupplyProvider({ children }: { children: ReactNode }) {
  const [supply, setSupply] = useState<Supply>(initialSupplyData);

  useEffect(() => {
    // Initialize with potentially dynamic dates on the client side
    setSupply({
      ...initialSupplyData,
      lastRefill: new Date(initialSupplyData.lastRefill),
    })
  }, [])


  const setPills = (pills: number) => {
    setSupply((prevSupply) => ({ ...prevSupply, pills }));
  };

  return (
    <SupplyContext.Provider value={{ supply, setPills }}>
      {children}
    </SupplyContext.Provider>
  );
}

export function useSupply() {
  const context = useContext(SupplyContext);
  if (context === undefined) {
    throw new Error('useSupply must be used within a SupplyProvider');
  }
  return context;
}
