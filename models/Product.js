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
      }
    }
  }

  @computed
  get cookedName() {
    return this.name;
  }
}