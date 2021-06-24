import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react"

import {
  ChevronRightIcon,
} from '@chakra-ui/icons'

import styles from './Layout.module.scss';

const Layout = observer(({ children, stores, router }) => {

  const translateLabel = (label) => {
    const translations = {
      products: 'Productos',
      providers: 'Proveedores',
      new: 'Creación',
      home: 'Home',
      Home: 'Home',
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
      debugger
      const routeKey = e !== '' ? e : 'home';
      routes[routeKey] = `/${routePath}`;
    });
    return routes;
  }
  const renderBreadcrumb = () => {
    const routes = getRoutes();
    if (!routes) { return 'Cargando' }
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

  const getClassActive = (url) => {
    return router?.pathname === url
      ? 'layout-container__menu-section-link-selected'
      : 'layout-container__menu-section-link';
  }
  return (
    <div className={styles['layout-container']}>
      <div className={styles['layout-container__menu']}>
        <div className={styles['layout-container__menu-section']}>
          <Text>PRODUCTOS</Text>
          <Link href="/products">
            <div
              className={styles[getClassActive('/products')]}
            >Listado</div>
          </Link>
          <Link href="/products/new">
            <div
              className={styles[getClassActive('/products/new')]}
            >Crear</div>
          </Link>
        </div>
        <div className={styles['layout-container__menu-section']}>
          <Text mb="12px">PROVEEDORES</Text>
          <Link href="/providers">
            <div
              className={styles[getClassActive('/providers')]}
            >Listado</div>
          </Link>
          <Link href="/providers/new">
            <div
              className={styles[getClassActive('/providers/new')]}
            >Crear</div>
          </Link>
        </div>
      </div>
      <div className={styles['layout-container__breadcrumb']}>
        {renderBreadcrumb()}
      </div>
      <div className={styles['layout-container__view']}>
        {children}
      </div>
    </div>
  );
})

export default withRouter(Layout);