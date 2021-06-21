import Head from 'next/head'
import Image from 'next/image'
import React, { Component } from 'react';

import { observer } from 'mobx-react';

@observer
class Product extends Component {
  render() {
    debugger
    return (
      <div>
        <h1>{`Producto ${this.props.productID}`}</h1>
      </div>
    )
  }
}

Product.getInitialProps = async ({ params }) => {
  return {
    props: { productID: params.id }  
  }
}

export default Product;