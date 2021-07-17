import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router';

import Table from '../../components/Table';
import {
  Flex,
  Center,
  Button,
  Heading,
  IconButton,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react"
import {
  EditIcon,
  DeleteIcon,
  SearchIcon,
} from '@chakra-ui/icons';

import { debounce } from 'lodash';
import styles from './styles/List.module.scss';
@observer
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = debounce(this.handleSearch.bind(this), 400);
  }

  componentDidMount() {
    const { stores } = this.props;
    this.setState({
      products: stores.products.search({}, 'products-list-view', true)
    })
  }

  handleSearch(search) {
    const { stores } = this.props;
    this.setState({
      products: stores.products.search({ search: search }, 'products-list-view', true),
    });
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
        label: 'Stock',
        content: (data) =>
          <Badge
            colorScheme={data.quantityStatusColor}
          >{`${data.quantityStatusLabel} (${data.stock_quantity})`}</Badge>,
        align: 'center'
      },
      {
        label: 'Acciones  ',
        isNumeric: true,
        content: (data) => (
          <>
            <IconButton
              isRound
              variant="ghost"
              colorScheme="teal"
              icon={<EditIcon />}
              onClick={() => router.push(`/products/${data?.id}`)}
            />
            <IconButton
              isRound
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
    const dataToRender = products?.isOk() ? products?.toArray() : stores?.products?.getDummy(15);
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
            >Nuevo producto</Button>
          </Center>
        </Flex>
        <InputGroup mt="3em" mb="-2em" w="30%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input 
            focusBorderColor="teal.400" 
            type="search" 
            placeholder="Buscar.."
            onChange={(e) => this.handleSearch(e.target.value)}
          />
        </InputGroup>
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