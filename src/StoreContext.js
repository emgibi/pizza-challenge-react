import React from 'react';

export const StoreContext = React.createContext();
export const useStoreContext = () => {
  return React.useContext(StoreContext);
};