import { Model } from './';

import {
  computed,
} from 'mobx';

import moment from 'moment';

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
            .map(prov => (
              this.store.appStore.stores.get('providers').getNew(prov)
            ));
      } else { this.providers = [] }
    }
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
    return status;
  }

  @computed
  get quantityStatusColor() {
    const status = this.quantityStatus;
    const statusColorMap = {
      ok: 'green',
      medium: 'orange',
      low: 'red',
    };
    return statusColorMap[status];
  }
  
  @computed
  get quantityStatusLabel() {
    const status = this.quantityStatus;
    const statusColorMap = {
      ok: 'En stock',
      medium: 'Stock medio',
      low: 'Stock bajo',
    };
    return statusColorMap[status];
  }
  
  toJson() {
    const jsonObject = Object.fromEntries(this.toJS());
    jsonObject.providers = jsonObject.providers.map(p => Object.fromEntries(p.attributes));
    return jsonObject;
  }
}