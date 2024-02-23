/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { GlobalContextProps } from './interfaces';

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};
