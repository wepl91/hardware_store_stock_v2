import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import Table from '../../components/Table';
import {
  Flex,
  Center,
  Button,
  Heading,
  Badge,
} from "@chakra-ui/react";

import { FiShoppingBag } from "react-icons/fi";

import { debounce } from 'lodash';
import moment from 'moment';

import styles from './styles/List.module.scss';

@observer
class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = debounce(this.handleSearch.bind(this), 400);
  }

  componentDidMount() {
    const { stores } = this.props;
    this.setState({
      purchases: stores.purchases.search({}, 'purchases-list-view', true)
    });
  }

  handleSearch(search) {
    const { stores } = this.props;
    this.setState({
      purchases: stores.purchases.search({ search: search }, 'purchases-list-view', true)
    });
  }

  getColumns() {
    return ([
      {
        label: '',
        content: () => <FiShoppingBag fontSize="1.5rem" color="#319795"/>
      },
      {
        label: 'Proveedor',
        content: (data) => data.providerModel.cookedName || '-',
      },
      {
        label: 'Fecha de creación',
        content: (data) => moment(data.created_at).format('DD/MM/YYYY') || '',
      },
      {
        label: 'Fecha de solicitud',
        content: (data) => moment(data.schedule_date).format('DD/MM/YYYY') || '',
      },
      {
        label: 'Estado',
        content: (data) =>
          <Badge
            colorScheme={data.statusColor}
          >{data.cookedStatus}</Badge>,
        align: 'center'
      },
    ]);
  }

  render() {
    const { purchases } = this.state;
    const { stores, router } = this.props;
    const dataToRender = purchases?.isOk() ? purchases?.toArray() : stores?.purchases?.getDummy(5);
    return (
      <>
        <Flex justify="space-between">
          <Center h="75px">
            <Heading as="h3" size="lg">Listado de compras</Heading>
          </Center>
          <Center h="75px">
            <Button
              colorScheme="teal"
              onClick={() => router.push('/purchases/new')}
            >
              Nueva compra
            </Button>
          </Center>
        </Flex>
        <Table
          className={styles['purchases-table']}
          isLoading={!purchases || !purchases.isOk()}
          columns={this.getColumns()}
          data={dataToRender}
        />
      </>
    )
  }
}

export default withRouter(Purchases);