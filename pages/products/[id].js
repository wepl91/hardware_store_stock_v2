import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import {
  Heading,
  Skeleton,
  Button,
  IconButton,
  Flex,
  Center,
  Text,
  useDisclosure,
  useToast,
  Avatar,
} from '@chakra-ui/react';

import {
  DeleteIcon,
} from '@chakra-ui/icons'

import ProductForm from '../../components/ProductForm';
import Table from '../../components/Table';
import SelectTeam from '../../images/SelectTeam';
import ProvidersSelectionModal from '../../components/ProviderSelectionModal';

import styles from './styles/Details.module.scss';

const ProductDetails = observer(({ stores, router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [product, setProduct] = useState(stores?.products?.getDummy(1));
  const [providers, setProviders] = useState(stores?.providers?.getDummy(5));

  const saveProduct = () => {
    setIsSaving(true);
    product.save().andThen((savedProduct, responseError) => {
      debugger
      if (!responseError) {
        toast({
          title: "Producto guardado",
          description: "El producto ha sido guardado exitosamente!",
          status: "success",
          duration: 1500,
          isClosable: true,
          onCloseComplete: () => {
            router.push('/products')
          }
        });
      } else {
        console.error(responseError);
        toast({
          title: "Upps!",
          description: "Hubo un inconveniente al guardar el producto!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSaving(false);
      }
    })
  }

  const getProvidersColumns = () => (
    [
      {
        label: '',
        content: (data) => <Avatar size="sm" bg="teal.500" />
      },
      {
        label: 'Nombre',
        content: (data) => data.cookedName,
      },
      {
        label: 'Teléfono',
        content: (data) => data.phone_number || '-',
      },
      {
        label: 'Email',
        content: (data) => data.email || '-',
      },
      {
        label: '',
        isNumeric: true,
        content: (data) => (
          <>
            <IconButton
              isRound
              variant="ghost"
              colorScheme="red"
              onClick={() => {
                const newProviders = product.providers.filter(pp => pp.id !== data.id);
                product.providers = newProviders;
                setProduct(product);
              }}
              icon={<DeleteIcon />}
            />
          </>
        )
      }
    ]
  );

  const renderProvidersList = () => {
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading
              className={styles['providers-header']}
              as="h5"
              size="md">Proveedores</Heading>
          </Center>
          <Center h="75px">
            <Button
              variant="ghost"
              colorScheme="teal"
              onClick={onOpen}
              isDisabled={isSaving || product?.isBusy()}
            >Agregar proveedor</Button>
          </Center>
        </Flex>
        {!product?.isBusy() && !product?.providers.length ? (
          <div class={styles['no-providers-container']}>
            <Text>Este producto no tiene ningún proveedor asignado</Text>
            <Text>Selecciona un proveedor y comienza a armar tu equipo de trabajo!</Text>
            <SelectTeam className={styles['no-providers']} />
          </div>
        ) : (
          <Table
            className={styles['providers-table']}
            isLoading={product?.isBusy()}
            columns={getProvidersColumns()}
            data={!product?.isBusy() ? product.providers : stores.providers?.getDummy(3)}
          />
        )}
        <ProvidersSelectionModal
          isOpenModal={isOpen}
          onCancel={onClose}
          loading={Array.isArray(providers)}
          providers={Array.isArray(providers) ? providers : providers?.toArray()}
          currentProviders={product?.providers}
          onSelect={(providers) => {
            product.providers = providers;
            setProduct(product);
            onClose();
          }}
        />
      </>
    )
  };

  useEffect(() => {
    const productID = router?.query?.id;
    setProduct(stores?.products?.get(productID, true));
    setProviders(stores?.providers?.search({}, 'details-product-view', true));
  }, []);
  return (
    <>
      {product?.isBusy() ? (
        <Skeleton
          height="40px"
          width="320px"
        />
      ) : (
        <Heading
          as="h3"
          size="lg"
        >{`Producto ${product?.name}`}</Heading>
      )}
      <ProductForm
        product={product}
        onChange={(editedProduct) => setProduct(editedProduct)}
        disabled={isSaving}
      />
      {renderProvidersList()}
      <Button
        isDisabled={product?.isBusy() || isSaving}
        isLoading={isSaving}
        mt="48px"
        colorScheme="teal"
        onClick={() => saveProduct()}
      >
        Guardar
      </Button>
    </>
  )
});

export default withRouter(ProductDetails);