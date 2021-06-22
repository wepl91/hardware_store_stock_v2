import { Provider } from '../models';
import Store from './Store'

export default class ProductsStore extends Store {
  urlRoot = 'providers';
  model = Provider;

  constructor(adapter, appStore) {
    super(adapter, appStore);
      this.adapter = adapter;
      this.appStore = appStore;
  }
};