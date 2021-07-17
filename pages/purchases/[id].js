import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import {
  Heading, Skeleton, Button, Flex, Center, useDisclosure, useToast,
  Menu, MenuButton, MenuList, MenuItem, Badge, Text, Box, Avatar,
} from '@chakra-ui/react';

import {
  ChevronDownIcon,
  CalendarIcon
} from '@chakra-ui/icons'

import Table from '../../components/Table';

import { upperFirst } from 'lodash';
import moment from 'moment';
import 'moment/locale/es-us';

import styles from './styles/Details.module.scss';

const PurchaseDetails = observer(({ stores, router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [purchase, setPurchase] = useState(stores?.purchases?.getDummy(1));

  const getProductsColumns = () => (
    [
      {
        label: 'Referencia',
        content: (data) => `${data.product?.reference}`,
      },
      {
        label: 'Nombre',
        content: (data) => data.product?.name || '-',
      },
      {
        label: 'Cantidad',
        content: (data) => data.quantity || '0',
      },
    ]
  );

  const renderProductsList = () => {
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading
              as="h5"
              size="md">Productos</Heading>
          </Center>
          <Center h="75px">
            {purchase?.isOk() ? (
              <Heading
                as="h6"
                size="xs"
                pr="1em"
              >{`Total: ${purchase.productsCount} productos`}</Heading>
            ) : null}
          </Center>
        </Flex>
        <Flex>

        </Flex>
        <Table
          className={styles['products-table']}
          isLoading={purchase?.isBusy()}
          columns={getProductsColumns()}
          data={!purchase?.isBusy() ? purchase?.productsModel : stores.products?.getDummy(3)}
        />
      </>
    )
  };

  useEffect(() => {
    const purchaseID = router?.query?.id;
    setPurchase(stores?.purchases?.get(purchaseID, true));
  }, []);
  return (
    <>
      {purchase?.isBusy() ? (
        <Skeleton
          height="75px"
          width="320px"
        />
      ) : (
        <Flex justify="space-between">
          <Center h="75px">
            <Heading
              as="h3"
              size="lg"
            >{`Compra a ${purchase?.providerModel?.cookedName}`}</Heading>
            <Badge
              ml="1em"
              mt="0.5em"
              fontSize="1em"
              colorScheme={purchase?.statusColor}
            >{purchase?.cookedStatus}</Badge>
          </Center>
          <Center h="75px">
            <Menu>
              <MenuButton
                variant="outline"
                colorScheme="teal"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >Actiones</MenuButton>
              <MenuList>
                <MenuItem>Marcar como recibida</MenuItem>
                <MenuItem>Cancelar compra</MenuItem>
              </MenuList>
            </Menu>
          </Center>
        </Flex>
      )}
      <Flex mt="2em" mb="2em">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="1em"
          mr="2em"
          bg="#F7FAFC"
          minWidth="20em"
        >
          <Flex mb="1em">
            <Avatar size="xs" bg="teal.500" mr="1em" />
            <Text fontWeight="600">{purchase?.providerModel?.cookedName}</Text>
          </Flex>
          <Text>{`Email: ${purchase?.providerModel?.email || 'N/A'}`}</Text>
          <Text>{`Tel: ${purchase?.providerModel?.phone_number || 'N/A'}`}</Text>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="1em"
          bg="#F7FAFC"
        >
          <CalendarIcon color="teal.500" mb="1em" />
          <Text fontWeight="600">Fecha de creación</Text>
          <Text>{upperFirst(moment(purchase?.created_at).locale('es-us').format('dddd DD [de] MMMM [del] yyyy'))}</Text>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="1em"
          ml="2em"
          bg="#F7FAFC"
        >
          <CalendarIcon color="teal.500" mb="1em" />
          <Text fontWeight="600">Fecha de entrega</Text>
          <Text>{upperFirst(moment(purchase?.schedule_date).locale('es-us').format('dddd DD [de] MMMM [del] yyyy'))}</Text>
        </Box>
        {purchase?.received_at ? (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            padding="1em"
            ml="2em"
            bg={purchase?.receivedDelayed ? '#FFF5F5' : '#F0FFF4'}
          >
            <Flex align="center"  mb="1em">
              <CalendarIcon color="teal.500" />
              <Badge
                ml="1em"
                colorScheme={purchase?.receivedDelayed ? 'red' : 'green'}
              >{purchase?.receivedDelayed ? 'Entrega retrazada' : 'Entregado a tiempo'}</Badge>
            </Flex>
            <Text fontWeight="600">Fecha de recepción</Text>
            <Text>{upperFirst(moment(purchase?.received_at).locale('es-us').format('dddd DD [de] MMMM [del] yyyy'))}</Text>
          </Box>
        ) : null}
      </Flex>
      {renderProductsList()}
    </>
  )
});

export default withRouter(PurchaseDetails);