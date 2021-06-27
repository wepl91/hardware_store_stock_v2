import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import {
  Heading,
  Button,
  useToast
} from '@chakra-ui/react';


const SettingDetails = observer(({ stores, router }) => {
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);

  const saveSetting = () => {
    setIsSaving(true);
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <Heading
        as="h3"
        size="lg"
      >{`Configuraciones`}</Heading>
    </>
  )
});

export default SettingDetails;