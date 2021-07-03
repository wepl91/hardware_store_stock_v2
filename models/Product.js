import { Model } from './';

import {
  computed,
} from 'mobx';

import moment from 'moment';

import { Provider } from './'; 

export default class Product extends Model {
  constructor(attributes, store) {
    let defaultAttributes = {
      name: '',
      reference: '',
      price: '',
      description: '',
      created_at: moment(),
      providers: new Array(),
      stock_quantity: 0,
    };

    let attrs = Object.assign(defaultAttributes, attributes);
    super(attrs, store);

    this.afterSetData = () => {
      if (this.toJS()?.get('providers')?.length) {
        this.providers =
          this
            .toJS()
            .get('providers')
            .map(prov => new Provider(prov, this.store.appStore.stores.get('providers')));
      }
    };
  }

  @computed
  get cookedName() {
    return this.name;
  }

  @computed
  get quantityStatus() {
    let status = 'ok';
    const { stock_quantity } = this;
    // We will define quantities to check when we implement settings
    if (stock_quantity < 15) status = 'low';
    if (stock_quantity > 15 && stock_quantity < 30) status = 'medium';
    if (!stock_quantity || stock_quantity < 1) status = 'none';
    return status;
  }

  @computed
  get quantityStatusColor() {
    const status = this.quantityStatus;
    const statusColorMap = {
      medium: 'orange',
      low: 'red',
      none: 'red',
      ok: 'green',
    };
    return statusColorMap[status];
  }
  
  @computed
  get quantityStatusLabel() {
    const status = this.quantityStatus;
    const statusColorMap = {
      medium: 'Stock medio',
      low: 'Stock bajo',
      none: 'Sin stock',
      ok: 'En stock',
    };
    return statusColorMap[status];
  }
  
  toJson() {
    const jsonObject = Object.fromEntries(this.toJS());
    jsonObject.providers = jsonObject.providers.map(p => Object.fromEntries(p.attributes));
    return jsonObject;
  }
}