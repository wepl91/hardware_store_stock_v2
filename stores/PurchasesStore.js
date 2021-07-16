import { Purchase } from '../models';
import Store from './Store'

export default class PurchasesStore extends Store {
  urlRoot = 'purchases';
  model = Purchase;

  constructor(adapter, appStore) {
    super(adapter, appStore);
      this.adapter = adapter;
      this.appStore = appStore;
  }
};