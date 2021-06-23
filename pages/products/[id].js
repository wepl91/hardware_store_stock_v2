import Head from 'next/head'
import Image from 'next/image'

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import {
  Heading,
  Skeleton,
  Button,
  IconButton,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react';

import {
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons'

import ProductForm from '../../components/ProductForm';
import Table from '../../components/Table';
import SelectTeam from '../../images/SelectTeam';

import moment from 'moment';

import styles from './styles/Details.module.scss';

@observer
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
    };
  }

  componentDidMount() {
    const { stores, router } = this.props;
    const productID = router?.query?.id;
    this.setState({
      product: stores.products.get(productID, true),
    })
  }

  saveProduct() {
    this.setState({
      isSaving: true
    })
  }

  getProvidersColumns() {
    return ([
      {
        label: 'Nombre',
        content: (data) => `${data.name}`,
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
        label: 'Fecha creación',
        content: (data) => data.created_at ? moment(data.created_at).format('DD-MM-YYYY') : '-',
        align: 'center'
      },
      {
        label: '',
        isNumeric: true,
        content: (data) => (
          <>
            <IconButton
              variant="ghost"
              colorScheme="red"
              icon={<DeleteIcon />}
            />
          </>
        )
      }
    ]);
  }

  renderProvidersList() {
    const { product, isSaving } = this.state;
    const { stores } = this.props;
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading
              className={styles['providers-header']}
              as="h5"
              size="md">Proveedores</Heading>
          </Center>
          <Center h="75px">
            <Button
              variant="ghost"
              colorScheme="teal"
              onClick={() => { }}
            >
              Agregar proveedor
            </Button>
          </Center>
        </Flex>
        {!product?.providers.length ? (
          <div class={styles['no-providers-container']}>
            <Text>Este producto no tiene ningún proveedor asignado</Text>
            <Text>Selecciona un proveedor y comienza a armar tu equipo de trabajo!</Text>
            <SelectTeam className={styles['no-providers']} />
          </div>
        ) : (
          <Table
            className={styles['providers-table']}
            isLoading={!product?.isOk()}
            columns={this.getProvidersColumns()}
            data={product?.isOk() ? product.providers : stores.providers.getDummy(3)}
          />
        )}
      </>
    )
  }

  render() {
    const { product, isSaving } = this.state;
    return (
      <>
        {!product?.isOk() ? (
          <Skeleton
            height="40px"
            width="320px"
          />
        ) : (
          <Heading
            as="h3"
            size="lg"
          >{`Producto ${product?.name}`}</Heading>
        )}
        <ProductForm
          product={product}
          onChange={(product) => this.setState({ product })}
          disabled={isSaving}
        />
        {this.renderProvidersList()}
        <Button
          isDisabled={!product?.isOk()}
          isLoading={isSaving}
          mt="48px"
          colorScheme="teal"
          onClick={() => this.saveProduct()}
        >
          {product?.isNew ? 'Crear' : 'Guardar'}
        </Button>
      </>
    )
  }
}

export default withRouter(ProductDetails);