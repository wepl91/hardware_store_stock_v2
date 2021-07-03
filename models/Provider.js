import { Model } from './';

import {
  computed,
} from 'mobx';

import { upperFirst } from 'lodash'

export default class Provider extends Model {
  constructor(attributes, store) {
    let defaultAttributes = { 
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
      keywords: new Array(),
    };
    let attrs = {
      ...defaultAttributes, 
      ...attributes
    };

    super(attrs, store);
  }

  @computed
  get cookedName() {
    return `${upperFirst(this.name)} ${upperFirst(this.last_name)}`;
  }

  toJson() {
    const jsonObject = Object.fromEntries(this.toJS());
    return jsonObject;
  }
}