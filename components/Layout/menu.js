import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { withRouter } from 'next/router'

import {
  Text,
  Icon,
} from "@chakra-ui/react"

import {
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiTool,
  FiShoppingBag,
  FiClipboard
} from "react-icons/fi";

import styles from './Layout.module.scss';

const Menu = ({ router }) => {

  const [sectionOpen, setSectionOpen] = useState();

  const getClassActive = (url) => {
    return router?.pathname === url
      ? 'layout-container__menu-section-link-selected'
      : 'layout-container__menu-section-link';
  };

  const getClassOpen = (section) => {
    return sectionOpen === section
      ? 'layout-container__menu-section-open'
      : 'layout-container__menu-section-closed';
  };

  const getChevronIcon = (section) => sectionOpen === section ? FiChevronUp : FiChevronDown;

  const handleSection = (section) => {
    if (section === sectionOpen) setSectionOpen(null);
    else setSectionOpen(section);
  }

  useEffect(() => {
    if (router.pathname.includes('providers')) setSectionOpen('provider');
    if (router.pathname.includes('products')) setSectionOpen('products');
    if (router.pathname.includes('purchases')) setSectionOpen('purchases');
    if (router.pathname.includes('sales')) setSectionOpen('sales');
  }, []);

  return (
    <div className={styles['layout-container__menu']}>
      <div className={styles[getClassOpen('products')]}>
        <div
          className={styles['layout-container__menu-section-header']}
          onClick={() => handleSection('products')}
        >
          <Icon w={5} h={5} as={FiTool} />
          <Text ml="1em">Productos</Text>
          <Icon
            className={styles['layout-container__menu-section-header-icon']}
            ml="4em"
            w={4} h={4}
            as={getChevronIcon('products')} />
        </div>
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
      <div className={styles[getClassOpen('providers')]}>
        <div
          className={styles['layout-container__menu-section-header']}
          onClick={() => handleSection('providers')}
        >
          <Icon w={5} h={5} as={FiUsers} />
          <Text ml="1em">Proveedores</Text>
          <Icon
            className={styles['layout-container__menu-section-header-icon']}
            ml="4em"
            w={4} h={4}
            as={getChevronIcon('providers')} />
        </div>
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
      <div className={styles[getClassOpen('purchases')]}>
        <div
          className={styles['layout-container__menu-section-header']}
          onClick={() => handleSection('purchases')}
        >
          <Icon w={5} h={5} as={FiShoppingBag} />
          <Text ml="1em">Compras</Text>
          <Icon
            className={styles['layout-container__menu-section-header-icon']}
            ml="4em"
            w={4} h={4}
            as={getChevronIcon('purchases')} />
        </div>
        <Link href="/purchases">
          <div
            className={styles[getClassActive('/purchases')]}
          >Listado</div>
        </Link>
        <Link href="/purchases/new">
          <div
            className={styles[getClassActive('/purchases/new')]}
          >Crear</div>
        </Link>
      </div>
      <div className={styles[getClassOpen('sales')]}>
        <div
          className={styles['layout-container__menu-section-header']}
          onClick={() => handleSection('sales')}
        >
          <Icon w={5} h={5} as={FiClipboard} />
          <Text ml="1em">Ventas</Text>
          <Icon
            className={styles['layout-container__menu-section-header-icon']}
            ml="4em"
            w={4} h={4}
            as={getChevronIcon('sales')} />
        </div>
        <Link href="/sales">
          <div
            className={styles[getClassActive('/sales')]}
          >Listado</div>
        </Link>
        <Link href="/sales/new">
          <div
            className={styles[getClassActive('/sales/new')]}
          >Crear</div>
        </Link>
      </div>
    </div>
  )
};

export default withRouter(Menu);