import { ReactNode, useReducer } from 'react';
import { GlobalContext } from '.';
import { globalReducer } from './reducer';
import { DEFAULT_STATE, LOCAL_STORAGE_NAME } from './constants';
import { GlobalContextState } from './interfaces';

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const localStorageState = localStorage.getItem(LOCAL_STORAGE_NAME);

  const initialState: GlobalContextState = localStorageState
    ? {
        ...JSON.parse(localStorageState),
        showMobileListContainer: false
      }
    : DEFAULT_STATE;

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};
