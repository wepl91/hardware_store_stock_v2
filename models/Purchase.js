import { Model, Product, Provider } from './';

import { computed } from 'mobx';

import moment from 'moment';

export default class Purchase extends Model {
  constructor(attributes, store) {
    let defaultAttributes = {
      provider: new Object(),
      products: new Array(),
      schedule_date: moment(),
      created_at: moment(),
      received_at: null,
      process_status: 'awaiting',
    };

    let attrs = Object.assign(defaultAttributes, attributes);
    super(attrs, store);
  
    this.afterSetData = () => {
      this.schedule_date = moment(this.schedule_date);
      this.created_at = moment(this.created_at);
      this.received_at = this.received_at ? moment(this.schedule_date) : null;
    };
  }

  @computed
  get providerModel() {
    return new Provider(this.toJS()?.get('provider'), this.store.appStore.stores.get('providers'));
  }
  
  @computed
  get productsModel() {
    return this.toJS()?.get('products')?.map(prod => (
      new Product(prod, this.store.appStore.stores.get('products'))
    ))
  }

  @computed
  get statusColor() {
    const statusColorMap = {
      closed: 'red',
      received: 'green',
      awaiting: 'orange',
    };
    return statusColorMap[this.process_status];
  }

  @computed
  get cookedStatus() {
    const statusMap = {
      cancelled: 'Cancelada',
      received: 'Recibida',
      awaiting: 'En espera',
    };
    return statusMap[this.process_status];
  }
    
  toJson() {
    const jsonObject = Object.fromEntries(this.toJS());
    jsonObject.provider = Object.fromEntries(jsonObject.provider.attributes);
    jsonObject.schedule_date = moment(jsonObject.schedule_date).toISOString();
    jsonObject.created_at = moment(jsonObject.created_at).toISOString();
    jsonObject.products = jsonObject.products.map(p => ({
      product: Object.fromEntries(p.product.attributes),
      quantity: p.quantity,
    }));
    return jsonObject;
  }
}