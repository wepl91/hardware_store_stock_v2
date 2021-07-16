import React from 'react';

import {
  Box,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import moment from 'moment';

const PurchaseCard = ({ purchase }) => {
  const getTotalProductsQuantity = () => {
    return purchase.products.reduce((total, prod) => {
      return parseInt(prod.quantity) + parseInt(total);
    }, 0);
  }
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="1.5em"
    >
      <Flex align="center">
        <Text
          fontSize="lg"
          fontWeight="600"
        >{`Compra a ${purchase.provider.cookedName}`}</Text>
        <Spacer />
        <Text 
          fontWeight="600"
        >{moment(purchase.scheduled_at).format('DD/MM/YYYY')}</Text>
      </Flex>
      <Text mt="1em" mb="0.5em" fontWeight="600">Productos</Text>
      {purchase.products.map((p, index) => (
        <Flex
          pt="0.5em"
          pb="0.5em"
          align="center"
          borderBottomColor="#CBD5E0"
          borderBottomStyle="solid"
          borderBottomWidth="1px"
        >
          <Text>{p.product?.name}</Text>
          <Spacer />
          <Text 
            fontWeight="600">{`Cantidad: ${p.quantity}`}</Text>
        </Flex>
      ))}
      <Flex>
        <Spacer />
        <Text 
          fontWeight="600" 
          mt="1.5em"
        >{`Cantidad total de productos: ${getTotalProductsQuantity()}`}</Text>
      </Flex>
    </Box>
  )
};

export default PurchaseCard;