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
  }

  render() {
    return (
      <div>
        <h1>Nuevo producto</h1>
      </div>
    )
  }
}

export default withRouter(ProductDetails);