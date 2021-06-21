import { Product } from '../models';
import Store from './Store'

export default class ProductsStore extends Store {
  urlRoot = 'products';
  model = Product;

  constructor(adapter, appStore) {
    super(adapter, appStore);
      this.adapter = adapter;
      this.appStore = appStore;
  }
};