import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import {
  Spinner,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

import PurchaseCard from '../../../components/PurchaseCard';

import moment from 'moment';

const ValidationStep = observer(({ purchase, stores, onCookedPurchases = () => {} }) => {
  const [loading, setLoading] = useState(true);
  const [purchaseList, setPurchaseList] = useState();
  const getCookedPurchases = () => {
    const purchaseList = [];
    purchase.products.forEach(product => {
      const purch = purchaseList.find(p => p?.provider?.id === product.product?.providers?.[0]?.id);
      if (!purch) {
        purchaseList.push(stores?.purchases?.getNew({
          provider: stores?.providers?.getNew(product?.product?.providers?.[0], stores?.providers),
          products: [product],
          schedule_date: purchase.schedule_date,
          created_at: moment(),
          received_at: null,
          status: 'open',
        }));
      } else {
        purch.products = [...purch.products, ...[product]];
      }
    });
    setPurchaseList(purchaseList);
    onCookedPurchases(purchaseList)
    setLoading(false);
  };


  useEffect(() => {
    getCookedPurchases()
  }, []);

  const renderCards = () => {
    return purchaseList.map((p, index) =>
      <PurchaseCard
        key={index}
        purchase={p}
      />
    );
  };

  return loading ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
    />
  ) :
    <div>
      <SimpleGrid
        columns={purchaseList?.length >= 3 ? 3 : 2}
        spacing={10}
      >
        {renderCards()}
      </SimpleGrid>
    </div>
});

export default ValidationStep;