import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Checkbox,
  Avatar,
  useRadio,
  Box,
  Text,
  useRadioGroup
} from "@chakra-ui/react"
import Table from '../Table';

import styles from './ProvidersSelectionModal.module.scss';

const ProvidersSelectionModal = observer(({
  isOpenModal,
  onSelect = () => { },
  onCancel = () => { },
  providers,
  loading,
  currentProviders,
  oneSelection = false,
}) => {
  const [selectedProviders, setSelectedProviders] = useState(currentProviders || []);
  const addProvider = (provider) => {
    setSelectedProviders([
      ...selectedProviders,
      ...[provider],
    ]);
  };

  const deleteProvider = (provider) => {
    setSelectedProviders(selectedProviders.filter(sp => sp.id !== provider.id));
  };

  const getColumns = () => (
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
        content: (data) => (
          <Checkbox
            colorScheme="teal"
            size="lg"
            defaultIsChecked={selectedProviders?.find(cp => cp.id === data.id)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              return isChecked ? addProvider(data) : deleteProvider(data);
            }}
          />
        )
      }
    ]
  );

  const renderRadioGroup = () => {
    const RadioCard = (props) => {
      const { getInputProps, getCheckboxProps } = useRadio(props)
      const input = getInputProps()
      const checkbox = getCheckboxProps()

      return (
        <Box as="label">
          <input {...input} />
          <Box
            {...checkbox}
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            _checked={{ bg: "teal.500", color: "white", borderColor: "teal.500" }}
            _focus={{ boxShadow: "outline" }}
            _hover={{ cursor: 'pointer' }}
            p="1em"
            mb="1em"
            mr="4em"
            ml="4em"
          >
            {props.children}
          </Box>
        </Box>
      )
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "provider",
      onChange: (providerID) => {
        setSelectedProviders(providers.filter(p => p.id !== providerID));
      },
    });

    const group = getRootProps();
    return (
      <div {...group} className={styles['providers-table']}>
        {providers.map((value) => {
          const radio = getRadioProps({ value: value.id })
          return (
            <RadioCard key={value} {...radio}>
              <div className={styles['provider-radio-button']}>
                <div>
                  <Avatar m="1em" mr="4em" size="sm" bg="teal.500" />
                </div>
                <div className={styles['provider-radio-button__item']}>
                  <Text m="1em">{`${value.name} ${value.last_name}`}</Text>
                </div>
                <div className={styles['provider-radio-button__item']}>
                  <Text m="1em">{value.email}</Text>
                </div>
              </div>
            </RadioCard>
          )
        })}
      </div>
    )
  }

  useEffect(() => {
    setSelectedProviders(currentProviders);
  }, [currentProviders]);

  return (
    <Modal
      size="XL"
      isOpen={isOpenModal}
      onClose={() => onCancel()}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent w="75%">
        <ModalHeader>Selecciona los proveedores de tu producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {oneSelection ? renderRadioGroup() :
            <Table
              className={styles['providers-table']}
              columns={getColumns()}
              data={providers}
              isLoading={loading}
            />}

        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => onSelect(selectedProviders)}
            isDisabled={!selectedProviders?.length}
          >Agregar</Button>
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => onCancel()}
          >Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
})

export default ProvidersSelectionModal;