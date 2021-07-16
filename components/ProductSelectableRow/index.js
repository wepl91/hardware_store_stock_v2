import React, { useState } from 'react';
import { observer } from 'mobx-react';

import {
  Box,
  Text,
  Badge,
  Skeleton,
  Checkbox,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";

import ProvidersSelectionModal from '../ProviderSelectionModal';

import styles from './ProductSelectableRow.module.scss';

const ProductSelectableRow = observer(({
  product,
  onSelect = () => { },
  isSelected = false,
  withProviderSelection = false,
  withQuantitySelection = false,
  selectedQuantity,
  onQuantityChange = () => { },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderInfo = () => {
    const DivContainer = ({ children, className = '' }) =>
      <div className={styles[`container__item${className}`]}>{children}</div>

    const skeletonProps = {
      width: '25%',
      height: '2em',
      mr: '1em',
      justify: 'space-between'
    }
    return product.isOk() ? (
      <>
        <DivContainer className="reference">
          <Text>{product.reference}</Text>
        </DivContainer>
        <DivContainer>
          <Text>{product.name}</Text>
        </DivContainer>
        <DivContainer>
          <Badge ml="1em"
            colorScheme={product.quantityStatusColor}
          >{`${product.quantityStatusLabel} (${product.stock_quantity})`}
          </Badge>
        </DivContainer>
        {withQuantitySelection ? (
          <DivContainer>
            <NumberInput
              className={styles['container__item-quantity-input']}
              value={selectedQuantity || 1}
              min={1}
              max={100}
              onChange={(value) => onQuantityChange(product, value)}
              isDisabled={product?.isBusy() || !isSelected}
              focusBorderColor="teal.400"
              variant="outline"
              ml="2em"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </DivContainer>
        ) : null}
        <Checkbox
          isChecked={isSelected}
          disabled={!product?.providers?.length}
          colorScheme="teal"
          className={styles['container__item-checkbox']}
          onChange={(e) => {
            const isChecked = e.target.checked;
            if (!isChecked) { onSelect(false, product) }
            if (isChecked && product?.providers?.length > 1 && withProviderSelection) { onOpen() }
            if (isChecked && product?.providers?.length === 1) { onSelect(true, product) }
          }}
        />
      </>
    ) : (
      <>
        <Skeleton {...skeletonProps} />
        <Skeleton {...skeletonProps} />
        <Skeleton {...skeletonProps} />
        {withQuantitySelection ? <Skeleton {...skeletonProps} /> : null}
        <Checkbox
          isChecked={isSelected}
          className={styles['container__item-checkbox']}
        />
      </>
    )
  }

  return (
    <Box
      mb="1.5em"
      p="1em"
      bg={!product?.providers?.length ? '#F7FAFC' : '#FFFFFF'}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={isSelected ? '#2D797B' : null}
    >
      <div className={styles.container}>{renderInfo()}</div>
      <ProvidersSelectionModal
        oneSelection
        isOpenModal={isOpen}
        onCancel={onClose}
        providers={product?.providers}
        onSelect={(providers) => {
          const productClone = product.clone();
          productClone.providers = providers
          onSelect(true, product);
          onClose();
        }}
      />
    </Box>
  )
});

export default ProductSelectableRow;