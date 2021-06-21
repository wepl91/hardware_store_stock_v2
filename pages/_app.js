import '../styles/globals.css'
import '../styles/globals.css'
import React from 'react';
import { AppStore } from '../stores';
const StoreProvider = React.createContext();

const MyApp = ({ Component, pageProps }) => {
  const isServer = typeof window === 'undefined';
  const initMobxState = pageProps ? pageProps.initMobxState : {};
  const mobxStore = isServer ? initMobxState : new AppStore(initMobxState);
  return (
    <StoreProvider.Provider value={mobxStore}>
      <StoreProvider.Consumer>
        {value => {
          const stores = value.stores || new Map();  
          return (
            <Component
              {...pageProps}
              stores={Object.fromEntries(stores)}
            />
          )
        }}
      </StoreProvider.Consumer>
    </StoreProvider.Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const mobxStore = new AppStore();
  return {
    ...mobxStore,
  };
}

export default MyApp;
