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
} from "@chakra-ui/react"

import moment from 'moment';

import styles from './styles/List.module.scss';
@observer
class Providers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { stores } = this.props;
    this.setState({
      providers: stores.providers.search({}, 'providers-list-view', true)
    })
  }

  getColumns() {
    return ([
      {
        label: 'Nombre',
        content: (data) => data.name || '-',
      },
      {
        label: 'Teléfono',
        content: (data) => data.phone_number || '-',
      },
      {
        label: 'Fecha creación',
        content: (data) => data.created_at ? moment(data.created_at).format('DD-MM-YYYY') : '-',
        align: 'center'
      },
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
        <Table
          className={styles['providers-table']}
          isLoading={!providers || !providers.isOk()}
          withPagination
          columns={this.getColumns()}
          data={dataToRender}
        />
      </>
    )
  }
}

export default withRouter(Providers);