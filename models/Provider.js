import { Model } from './';

import {
  action,
  computed,
} from 'mobx';

export default class Provider extends Model {
  constructor(attributes, store) {
    let defaultAttributes = { };
    let attrs = {
      ...defaultAttributes, 
      ...attributes
    };

    super(attrs, store);
  }

  @computed
  get cookedName() {
    return this.name;
  }
}