import React from 'react';
import { observer } from 'mobx-react';

import NotFound from '../images/NotFound';
import {
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

import styles from '../styles/NotFound.module.scss';

const NotFoundView = observer(() => (
  <div className={styles['view-container']}>
    <NotFound className={styles['view-container__image']} />
    <div className={styles['view-container__message']}>
      <Text>
        Ups! No sabemos como llegaste hasta acá, pero podes volver a la home haciendo click
        <Link
          className={styles['view-container__message-link']}
          href="/"
        ><strong>{` aquí.`}</strong></Link>
      </Text>
    </div>
  </div>
));

export default NotFoundView;