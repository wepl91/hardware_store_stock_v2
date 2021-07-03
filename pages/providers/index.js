import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'

import Table from '../../components/Table';
import {
  Flex,
  Center,
  Button,
  Heading,
  IconButton,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react"
import {
  EditIcon,
  DeleteIcon,
  SearchIcon,
} from '@chakra-ui/icons'

import { debounce } from 'lodash';
import styles from './styles/List.module.scss';
@observer
class Providers extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = debounce(this.handleSearch.bind(this), 400);
  }

  componentDidMount() {
    const { stores } = this.props;
    this.setState({
      providers: stores.providers.search({}, 'providers-list-view', true)
    });
  }

  handleSearch(search) {
    const { stores } = this.props;
    this.setState({
      providers: stores.providers.search({ search: search }, 'providers-list-view', true)
    });
  }

  getColumns() {
    const { router } = this.props;
    return ([
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
        label: 'Acciones  ',
        isNumeric: true,
        content: (data) => (
          <>
            <IconButton
              isRound
              variant="ghost"
              colorScheme="teal"
              icon={<EditIcon />}
              onClick={() => router.push(`/providers/${data?.id}`)}
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
    const { providers } = this.state;
    const { stores, router } = this.props;
    const dataToRender =
      providers?.isOk() ?
        providers?.toArray() :
        stores?.providers?.getDummy(5);
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading as="h3" size="lg">Listado de proveedores</Heading>
          </Center>
          <Center h="75px">
            <Button
              colorScheme="teal"
              onClick={() => router.push('/providers/new')}
            >
              Nuevo proveedor
            </Button>
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
          className={styles['providers-table']}
          isLoading={!providers || !providers.isOk()}
          columns={this.getColumns()}
          data={dataToRender}
        />
      </>
    )
  }
}

export default withRouter(Providers);