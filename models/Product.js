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
  }

  @computed
  get cookedName() {
    return this.name;
  }
}