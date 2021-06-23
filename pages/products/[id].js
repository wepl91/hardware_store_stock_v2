import Head from 'next/head'
import Image from 'next/image'

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'next/router'

import {
  Flex,
  Center,
  Heading,
  Skeleton,
  Button,
} from '@chakra-ui/react';

import ProductForm from '../../components/ProductForm';

@observer
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
    };
  }
  
  componentDidMount() {
    const { stores, router } = this.props;
    const productID = router?.query?.id;
    this.setState({
      product: stores.products.get(productID, true),
    })
  }
  
  saveProduct() {
    this.setState({
      isSaving: true
    })
  }

  render() {
    const { product, isSaving } = this.state;
    return (
      <>
        <Flex>
          <Center h="75px">
            {!product?.isOk() ? (
              <Skeleton height="40px" width="320px" />
            ) : (
              <Heading as="h3" size="lg">{`Producto ${product?.name}`}</Heading>
            )}
          </Center>
        </Flex>
        <ProductForm
          product={product}
          onChange={(product) => this.setState({ product })}
          disabled={isSaving}
        />
        <Button
          isDisabled={!product?.isOk()}
          isLoading={isSaving}
          mt="48px"
          colorScheme="teal"
          onClick={() => this.saveProduct()}
        >
          Nuevo producto
        </Button>
      </>
    )
  }
}

export default withRouter(ProductDetails);