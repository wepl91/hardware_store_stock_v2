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
} from "@chakra-ui/react"
import Table from '../Table';

import styles from './ProvidersSelectionModal.module.scss';

const ProvidersSelectionModal = observer(({
  isOpenModal,
  onSelect = () => { },
  onCancel = () => { },
  providers,
  loading,
  currentProviders
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

  useEffect(() => {
    setSelectedProviders(currentProviders);
  }, [currentProviders])

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
          <Table
            className={styles['providers-table']}
            columns={getColumns()}
            data={providers}
            isLoading={loading}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => onSelect(selectedProviders)}
            isDisabled={!selectedProviders.length}
          >
            Agregar
          </Button>
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => onCancel()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
})

export default ProvidersSelectionModal;