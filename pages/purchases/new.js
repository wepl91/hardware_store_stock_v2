import Head from 'next/head'
import Image from 'next/image'

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import {
  Heading,
  Skeleton,
  Flex,
  useToast,
  Button,
  Center,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import { ProductSelectionStep, ValidationStep } from '../../components/StepsComponents';
import DatePicker from '../../components/DatePicker';

import styles from './styles/Details.module.scss';

const PurchaseCreate = observer(({ stores, router }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [purchase, setPurchase] = useState(stores?.purchases?.getNew());
  const [cookedPurchases, setCookedPurchases] = useState();

  const savePurchase = () => {
    setIsSaving(true);
    Promise.all(cookedPurchases.map(p => p.save()))
      .then((responses) => {
        toast({
          title: `${responses.length > 1 ? 'Compras generadas' : 'Compra generada'}`,
          description: `${responses.length > 1 ? 'Las compras han sido generadas exitosamente!' : 'La compra ha sido generada exitosamente!'}`,
          status: "success",
          duration: 1500,
          isClosable: true,
          onCloseComplete: () => {
            router.push('/purchases')
          }
        });
      })
      .catch((error) => {
        console.error(responseError);
        toast({
          title: "Upps!",
          description: "Hubo un inconveniente al generar la compra!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSaving(false);
      })
  }

  const getSteps = () => {
    return (
      [
        {
          label: 'Selección de productos',
          key: 'Selección de productos',
          content:
            <div className={styles['steps__content-products']}>
              <ProductSelectionStep
                stores={stores}
                currentProducts={purchase?.products}
                onChange={(products) => {
                  purchase.products = products
                  setPurchase(purchase)
                }}
              />
            </div>
        },
        {
          label: 'Fecha de solicitud',
          key: 'Fecha de solicitud',
          content:
            <div className={styles['steps__content-date']}>
              <DatePicker
                disableToday
                selectedDate={purchase?.schedule_date}
                onDateSelected={(date) => {
                  purchase.schedule_date = date;
                  setPurchase(purchase);
                }}
              />
            </div>
        },
        {
          label: 'Verificación de la compra',
          key: 'Verificación de la compra',
          content:
            <div className={styles['steps__content-validation']}>
              <ValidationStep
                stores={stores}
                purchase={purchase}
                onCookedPurchases={(purchases) => setCookedPurchases(purchases)}
              />
            </div>
        },
      ]
    );
  }
  return (
    <>
      {purchase?.isBusy() ? (
        <Skeleton
          height="40px"
          width="320px"
        />
      ) : (
        <Flex justify="space-between">
          <Center h="75px">
            <Heading
              as="h3"
              size="lg"
            >Nueva compra</Heading>
          </Center>
        </Flex>
      )}
      <Steps
        className={styles['steps']}
        responsive
        activeStep={activeStep}
        colorScheme="teal"
      >
        {getSteps().map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      <div className={styles['steps-nav']}>
        <Button
          isDisabled={false}
          colorScheme="teal"
          onClick={prevStep}
          mt="1.5em"
        >
          Anterior
        </Button>
        <Button
          isDisabled={false}
          colorScheme="teal"
          onClick={() => activeStep == 2 ? savePurchase() : nextStep()}
          mt="1.5em"
        >
          {activeStep == 2 ? 'Guardar' : 'Siguiente'}
        </Button>
      </div>
    </>
  )
});

export default withRouter(PurchaseCreate);