import React from 'react';
import { observer } from 'mobx-react';

import {
  Input,
  Stack,
  Flex,
  Text,
  InputLeftAddon,
  InputGroup,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

const ProductForm = observer(({ product, onChange, disabled }) => {
  const handler = (field, value) => {
    product[field] = value;
    onChange(product);
  }
  return (
    <Stack>
      <Flex pt="32px">
        <Stack w="30%">
          <Text mb="8px">Nombre</Text>
          <Input
            focusBorderColor="teal.400"
            isDisabled={product?.isBusy() || disabled}
            variant="outline"
            placeholder="Ej: Martillo"
            value={product?.name}
            onChange={(e) => handler('name', e.target.value)}
          />
        </Stack>
        <Stack w="30%" ml="5%">
          <Text mb="8px">Referencia</Text>
          <Input
            focusBorderColor="teal.400"
            isDisabled={product?.isBusy() || disabled}
            variant="outline"
            placeholder="Ej: 12345"
            value={product?.reference}
            onChange={(e) => handler('reference', e.target.value)}
          />
        </Stack>
      </Flex>
      <Flex pt="32px">
        <Stack w="30%">
          <Text mb="8px">Precio</Text>
          <InputGroup>
            <InputLeftAddon>$</InputLeftAddon>
            <Input
              focusBorderColor="teal.400"
              isDisabled={product?.isBusy() || disabled}
              variant="outline"
              value={product?.price}
              onChange={(e) => handler('price', e.target.value)}
            />
          </InputGroup>
        </Stack>
        <Stack w="30%" ml="5%">
          <Text mb="8px">Stock</Text>
          <NumberInput
            value={product?.stock_quantity}
            min={0}
            max={10000}
            focusBorderColor="teal.400"
            isDisabled={product?.isBusy() || disabled}
            variant="outline"
            onChange={(value) => handler('stock_quantity', value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </Flex>
      <Flex pt="32px">
        <Stack w="65%">
          <Text mb="8px">Descripción</Text>
          <Textarea
            focusBorderColor="teal.400"
            isDisabled={product?.isBusy() || disabled}
            placeholder="Ej: Descripción de un martillo"
            value={product?.description}
            onChange={(e) => handler('description', e.target.value)}
          />
        </Stack>
      </Flex>
    </Stack>
  );
})

export default ProductForm;