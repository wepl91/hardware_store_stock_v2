import Head from 'next/head'
import Image from 'next/image'

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

@observer
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { stores, router } = this.props;
    const productID = router?.query?.id;
    this.setState({
      product: stores.products.get(productID, true),
    })
  }
  render() {
    const { product } = this.state;
    const { stores } = this.props;
    if (!product?.isOk()) {
      return (
        <div>
          <h1>Cargando</h1>
        </div>
      )
    }
    if (product?.isError()) {
      return (
        <div>
          <h1>Error</h1>
        </div>
      )
    }
    return (
      <div>
        <h1>{`Producto ${product?.id}`}</h1>
        <button
          onClick={() => stores?.ui?.toggleMenu()}
        >{stores?.ui?.openMenu ? 'Cerrar' : 'Abrir'}</button>
      </div>
    )
  }
}

export default withRouter(ProductDetails);