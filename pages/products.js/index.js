import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Head from 'next/head'
import Image from 'next/image'

import Table from '../../components/Table';

import moment from 'moment';
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
        content: (data) => data.price ? `$${data.price}` : '-',
        align: 'center'
      },
      {
        label: 'Fecha creación',
        content: (data) => data.created_at ? moment(data.created_at).format('DD-MM-YYYY') : '-',
        align: 'center'
      },
    ]);
  }

  render() {
    const { products } = this.state;
    const { stores } = this.props;
    return (
      <div>
        <Table
          isLoading={!products || !products.isOk()}
          withPagination
          columns={this.getColumns()}
          data={products && products.isOk() ? products.toArray() : stores && stores.products && stores.products.getDummy(10)}
        />
      </div>
    )
  }
}

export default Products;