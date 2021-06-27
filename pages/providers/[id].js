import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router';

import {
  Heading,
  Skeleton,
  Button,
  useToast
} from '@chakra-ui/react';

import ProviderForm from '../../components/ProviderForm';

const ProviderDetail = observer(({ stores, router }) => {
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [provider, setProvider] = useState(stores?.products?.getDummy(1));

  const saveProvider = () => {
    setIsSaving(true);
    provider.save().andThen((savedProvider, responseError) => {
      if (!responseError) {
        toast({
          title: "Proveedor guardado",
          description: "El proveedor ha sido guardado exitosamente!",
          status: "success",
          duration: 1500,
          isClosable: true,
          onCloseComplete: () => {
            router.push('/providers')
          }
        });
      } else {
        console.error(responseError);
        toast({
          title: "Upps!",
          description: "Hubo un inconveniente al guardar el proveedor!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSaving(false);
      }
    })
  }

  useEffect(() => {
    const providerID = router?.query?.id;
    setProvider(stores?.providers?.get(providerID, true));
  }, []);
  
  return (
    <>
      {provider?.isBusy() ? (
        <Skeleton
          height="40px"
          width="320px"
        />
      ) : (
        <Heading
          as="h3"
          size="lg"
        >{`Proveedor ${provider?.name}`}</Heading>
      )}
      <ProviderForm
        provider={provider}
        onChange={(editedProvider) => setProvider(editedProvider)}
        disabled={isSaving}
      />
      <Button
        isDisabled={provider?.isBusy() || isSaving}
        isLoading={isSaving}
        mt="48px"
        colorScheme="teal"
        onClick={() => saveProvider()}
      >
        Guardar
      </Button>
    </>
  )
});

export default withRouter(ProviderDetail);