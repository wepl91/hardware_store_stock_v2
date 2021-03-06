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
      cancelled_at: null,
      received_at: null,
      process_status: 'awaiting',
    };

    let attrs = Object.assign(defaultAttributes, attributes);
    super(attrs, store);

    this.afterSetData = () => {
      this.schedule_date = moment(this.schedule_date);
      this.created_at = moment(this.created_at);
      this.received_at = this.received_at ? moment(this.received_at) : null;
      this.cancelled_at = this.cancelled_at ? moment(this.cancelled_at) : null;
    };
  }

  @computed
  get canBeCancelled() {
    return !['canceled', 'received'].includes(this.status);
  }

  @computed
  get canBeMarkedAsReceived() {
    return !['canceled', 'received'].includes(this.status);
  }

  @computed
  get providerModel() {
    return new Provider(this.toJS()?.get('provider'), this.store.appStore.stores.get('providers'));
  }

  @computed
  get productsModel() {
    return this.toJS()?.get('products')?.map(prod => ({
      product: new Product(prod.product, this.store.appStore.stores.get('products')),
      quantity: prod.quantity,
    }));
  }

  @computed
  get productsCount() {
    return this.toJS()?.get('products').reduce((total, prod) => {
      return parseInt(prod.quantity) + parseInt(total);
    }, 0);
  }

  @computed
  get statusColor() {
    const statusColorMap = {
      cancelled: 'red',
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

  @computed
  get receivedDelayed() {
    return moment(this.schedule_date).format('L') !== moment(this.received_at).format('L');
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