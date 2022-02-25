import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react';

import {
  Heading,
} from '@chakra-ui/react';

const Home = observer(() => {

  const isServer = typeof window === 'undefined';

  useEffect(() => {
    console.log('Is loaded')
  }, []);

  return (
    <div className={styles.container}>
      <Heading
        as="h3"
        size="lg"
      >{`Bienvenido!`}</Heading>
        <div className={styles['chart-container']}>
          <div className={styles['chart-container__chart']}>
          </div>
        </div>
    </div>
  );
});

Home.getInitialProps = async ({ mobxStore }) => {
  return {
    store: mobxStore,
  }
}

export default Home;