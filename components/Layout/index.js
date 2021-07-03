import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
} from "@chakra-ui/react"
import {
  ChevronRightIcon,
  SettingsIcon,
} from '@chakra-ui/icons'

import Menu from './menu';
import LoggedUserAvatar from '../LoggedUserAvatar';

import styles from './Layout.module.scss';

const Layout = observer(({ children, stores, router }) => {

  const translateLabel = (label) => {
    const translations = {
      404: '404',
      products: 'Productos',
      providers: 'Proveedores',
      new: 'Creación',
      home: 'Home',
      Home: 'Home',
      settings: 'Configuraciones',
    };
    return translations[label];
  }

  const getRoutes = () => {
    const path = router?.pathname || '';
    const pathSplited = path.split('/');
    const routes = {
      Home: '/',
    }
    pathSplited.filter(p => p !== '').forEach((e, i) => {
      const routePath = pathSplited.filter(p => p !== '').slice(0, i + 1).join('/');
      const routeKey = e !== '' ? e : 'home';
      routes[routeKey] = `/${routePath}`;
    });
    return routes;
  }

  const renderBreadcrumb = () => {
    const routes = getRoutes();
    if (!routes) { return 'Cargando' }
    if (Object.keys(routes).includes('404')) {
      return (
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem key={'home'}>
            <BreadcrumbLink>
              <Link href={'/'}>
                {'Home'}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem key={'404'}>
            <BreadcrumbLink>
              {'404'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
    return (
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
        {Object.keys(routes).map(rk => (
          <BreadcrumbItem key={rk}>
            <BreadcrumbLink>
              <Link href={routes[rk]}>
                {translateLabel(rk) || 'Edición'}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}∫
      </Breadcrumb>
    )
  }

  const renderActions = () => (
    <div className={styles['layout-container__breadcrumb-actions']}>
      <LoggedUserAvatar />
    </div>
  )

  return (
    <div className={styles['layout-container']}>
      <Menu />
      <div className={styles['layout-container__breadcrumb']}>
        {renderBreadcrumb()}
        {renderActions()}
      </div>
      <div className={styles['layout-container__view']}>
        {children}
      </div>
    </div>
  );
})

export default withRouter(Layout);