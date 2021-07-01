import React from 'react';
import { observer } from 'mobx-react';

import {
  Input,
  Stack,
  Flex,
  Text,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react"

const ProviderForm = observer(({ provider, onChange, disabled }) => {
  const handler = (field, value) => {
    provider[field] = value;
    onChange(provider);
  }
  return (
    <Stack>
      <Flex pt="32px">
        <Stack w="30%">
          <Text mb="8px">Nombre</Text>
          <Input
            focusBorderColor="teal.400"
            isDisabled={provider?.isBusy() || disabled}
            variant="outline"
            placeholder="Ej: Martin"
            value={provider?.name}
            onChange={(e) => handler('name', e.target.value)}
          />
        </Stack>
        <Stack w="30%" ml="5%">
          <Text mb="8px">Apellido</Text>
          <Input
            focusBorderColor="teal.400"
            isDisabled={provider?.isBusy() || disabled}
            variant="outline"
            placeholder="Ej: Perez"
            value={provider?.last_name}
            onChange={(e) => handler('last_name', e.target.value)}
          />
        </Stack>
      </Flex>
      <Flex pt="32px">
        <Stack w="30%">
          <Text mb="8px">Teléfono</Text>
          <InputGroup>
            <InputLeftAddon children="+54" />
            <Input
              focusBorderColor="teal.400"
              isDisabled={provider?.isBusy() || disabled}
              variant="outline"
              placeholder="Ej: 1154223463"
              value={provider?.phone_number}
              onChange={(e) => handler('phone_number', e.target.value)}
            />
          </InputGroup>
        </Stack>
        <Stack w="30%" ml="5%">
          <Text mb="8px">Email</Text>
          <Input
            focusBorderColor="teal.400"
            isDisabled={provider?.isBusy() || disabled}
            variant="outline"
            value={provider?.email || ''}
            placeholder="Ej: test@gmail.com"
            onChange={(e) => handler('email', e.target.value)}
          />
        </Stack>
      </Flex>
      <Flex pt="32px">
        <Stack w="65%">
          <Text mb="8px"></Text>

        </Stack>
      </Flex>
    </Stack>
  );
})

export default ProviderForm;