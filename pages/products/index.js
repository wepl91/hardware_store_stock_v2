import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router';

import Head from 'next/head'
import Image from 'next/image'

import Table from '../../components/Table';
import {
  Flex,
  Center,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react"
import {
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons'

import moment from 'moment';

import styles from './styles/List.module.scss';
@observer
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { stores } = this.props;
    this.setState({
      products: stores.products.search({}, 'products-list-view', true)
    })
  }

  getColumns() {
    const { router } = this.props;
    return ([
      {
        label: 'Referencia',
        content: (data) => `${data.reference}`,
      },
      {
        label: 'Nombre',
        content: (data) => data.name || '-',
      },
      {
        label: 'Descripción',
        content: (data) => data.description || '-',
      },
      {
        label: 'Precio',
        content: (data) => `$${data.price || '-'}`,
        align: 'center'
      },
      {
        label: 'Fecha creación',
        content: (data) => data.created_at ? moment(data.created_at).format('DD-MM-YYYY') : '-',
        align: 'center'
      },
      {
        label: 'Acciones  ',
        isNumeric: true,
        content: (data) => (
          <>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              icon={<EditIcon />}
              onClick={() => router.push(`/products/${data?.id}`)}
            />
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

  render() {
    const { products } = this.state;
    const { stores, router } = this.props;
    const dataToRender =
      products?.isOk() ?
        products?.toArray() :
        stores?.products?.getDummy(5);
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading as="h3" size="lg">Listado de productos</Heading>
          </Center>
          <Center h="75px">
            <Button
              colorScheme="teal"
              onClick={() => router.push('/products/new')}
            >
              Nuevo producto
            </Button>
          </Center>
        </Flex>
        <Table
          className={styles['products-table']}
          isLoading={!products || !products.isOk()}
          columns={this.getColumns()}
          data={dataToRender}
        />
      </>
    )
  }
}

export default withRouter(Products);