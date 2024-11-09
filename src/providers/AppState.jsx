import { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext({  //creating context - must step
  currentList: null,
});
export function AppState({ children }) {
  const [currentList, setCurrentList] = useState(null);

  const value = useMemo( /useMemo is a hook that returns a memoized value. Optimizes calculations or values within a component. 
                         // Memoized - To store (the result of a computation) so that it can be subsequently retrieved without repeating the computation.
    () => ({
      currentList,
      setCurrentList,
    }),
    [currentList]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }

  return context;
}
