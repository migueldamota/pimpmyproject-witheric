import { createContext, useContext, useMemo, useState } from "react";

interface DrinksData {
  Wasser: number
  Cola: number
}

const PageContextL = createContext(
  { drinks: { Wasser: 50, Cola: 50 } } as { drinks: DrinksData, setDrinks: (drinks: DrinksData) => void }
);

export function useDrinks () {
    return useContext(PageContextL);
}

export function PageContext ({ children }: { children: any }) {
  const [drinks, setDrinks] = useState({ Wasser: 50, Cola: 50 } as DrinksData);
  const value = useMemo(() => ({ drinks, setDrinks }), [drinks, setDrinks]);

  return (
    <PageContextL.Provider value={value}>
      { children }
    </PageContextL.Provider>
  )
}
