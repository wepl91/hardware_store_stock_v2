import Head from 'next/head'
import Image from 'next/image'
import React, { Component } from 'react';

import { observer } from 'mobx-react';

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

  render() {
    const { products } = this.state;
    if (!products || !products.isOk()) {
      console.dir(products)
      return 'Cargando';
    }
    if (products && products.isOk()) {
      return(
        <div>
          <ul>
            {products.toArray().map(prod => <li>{prod.id}</li>)}
          </ul>
        </div>
      )
    }
  }
}

export default Products;