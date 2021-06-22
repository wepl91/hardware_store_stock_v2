import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppStore } from '../stores';
import Layout from '../components/Layout';
import '../styles/globals.css'
import '../styles/globals.css'

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
          const storesObject = Object.fromEntries(stores);
          return (
            <ChakraProvider>
              <Layout
                stores={storesObject}
              >
                <Component
                  {...pageProps}
                  stores={storesObject}
                />
              </Layout>
            </ChakraProvider>
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
