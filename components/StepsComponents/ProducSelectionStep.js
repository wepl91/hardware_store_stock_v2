import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import { debounce } from 'lodash'

import {
  InputGroup,
  InputLeftElement,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  SearchIcon,
} from '@chakra-ui/icons'

import ProductSelectableRow from '../ProductSelectableRow';

import { cloneDeep } from 'lodash';
import useUpdateEffect from '../../hooks/useUpdateEffect';

import styles from './Steps.module.scss';

const ProductSelection = observer(({ stores, onChange, currentProducts = [] }) => {
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState(currentProducts);

  const debouncedRequest = debounce(handleSearch, 300);

  function handleSearch(value) {
    setProducts(stores?.products?.search(
      { search: value },
      'purchase-create-product-selection',
      true)
    );
  }

  const addProduct = (isAdded, product) => {
    const isProductInList = selectedProducts.some(sp => sp?.product.id === product.id);
    if (isProductInList && isAdded) return //For some reason is trying to add an existing product in list
    if (!isProductInList && !isAdded) return //For some reason is trying to remove an inexisting product in list
    if (isAdded && !isProductInList) { setSelectedProducts([...selectedProducts, ...[{ product: product, quantity: 1 }]]) }
    if (!isAdded && isProductInList) { setSelectedProducts(selectedProducts.filter(sp => sp?.product?.id !== product.id)) }
  }

  const updateQuantity = (product, quantity) => {
    const productObject = selectedProducts.find(sp => sp?.product?.id === product.id);
    const index = selectedProducts.indexOf(productObject);
    productObject.quantity = quantity;
    selectedProducts[index] = productObject;
    setSelectedProducts(selectedProducts);
  }

  const renderEmptyMessage = () => <Text>Haz una búsqueda</Text>;

  useEffect(() => {
    onChange(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    setSelectedProducts(currentProducts);
  }, [currentProducts]);

  return (
    <div className={styles['product-selection-step']}>
      <InputGroup mb="1em" w="100%">
        <InputLeftElement
          pointerEvents="none"
        >
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          focusBorderColor="teal.400"
          type="search"
          placeholder="Buscar.."
          onChange={(e) => debouncedRequest(e.target.value)}
        />
      </InputGroup>
      {!products || !products?.length && renderEmptyMessage()}
      {products && !products.isOk() && stores?.products?.getDummy(5).map((prod, index) => <ProductSelectableRow key={index} product={prod} />)}
      {products?.isOk() && products?.toArray()?.map((prod, index) =>
        <ProductSelectableRow
          key={index}
          withProviderSelection
          withQuantitySelection
          isSelected={selectedProducts.find(sp => sp?.product?.id === prod.id)}
          product={prod}
          onSelect={(isSelected) => addProduct(isSelected, prod)}
          onQuantityChange={(product, quantity) => updateQuantity(product, quantity)}
          selectedQuantity={selectedProducts.find(sp => sp?.product?.id === prod.id)?.quantity}
        />
      )}
    </div>
  )
});

export default ProductSelection;