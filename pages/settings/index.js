import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import {
  Heading,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons'

import styles from './styles/Details.module.scss';

const SettingDetails = observer(({ stores, router }) => {
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(false);
  const [unstableConection, setUnstableConection] = useState(false);

  const saveSetting = () => {
    setIsSaving(true);
  }

  useEffect(() => {
  }, []);

  return (
    <div className={styles['settings-container']}>
      <Heading
        as="h3"
        size="lg"
        mb="2em"
      >{`Configuraciones`}</Heading>
      <Heading
        className={styles['settings-container__low-stock']}
        as="h5"
        size="md">Notificaciones</Heading>
      <FormControl className={styles['settings-container__form']} p="0.5em" mt="1.5em" display="flex" alignItems="center">
        <Switch
          mr="1em"
          colorScheme="teal"
          id="low-stock-alert"
          onChange={(e) => setLowStockAlert(e.target.checked)}
        />
        <FormLabel htmlFor="email-alerts" mb="0">
          Habilitar notificaciones de bajo stock de los productos.
        </FormLabel>
        {lowStockAlert ? (
          <>
            <NumberInput ml="3em" w="10em" defaultValue={15} min={0} max={30}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Tooltip
              hasArrow
              mb="1em"
              p="0.5em"
              placement="top-end"
              color="gray.600"
              bg="gray.200"
              label="Ingresá la cantidad de stock a partir de la cual querés ser notificado."
              aria-label="Alerta de stock bajo">
              <InfoOutlineIcon ml="1em" color="teal.400" />
            </Tooltip>
          </>
        ) : null}
      </FormControl>
      <FormControl className={styles['settings-container__form']} p="0.5em" mt="1.5em" display="flex" alignItems="center">
        <Switch
          mr="1em"
          colorScheme="teal"
          id="unstable-conection"
          onChange={(e) => setUnstableConection(e.target.checked)} />
        <FormLabel htmlFor="email-alerts" mb="0">
          Habilitar notificaciones de conexión de internet inestable.
        </FormLabel>
      </FormControl>
    </div>
  )
});

export default SettingDetails;