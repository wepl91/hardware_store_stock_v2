import { observable, action, computed, makeObservable, toJS } from 'mobx';
import { statuses } from '../utils/constants';

export default class Model {
  uriBase = '';
  primaryKey = 'id';
  store = null;
  error = null;
  onUpdateCallback;

  @observable attributes = new Map();
  @observable status;

  constructor(attributes, store) {
    this.status = statuses.EMPTY;
    makeObservable(this);
    this.store = store;
    this.set(attributes);
  }

  transformData(data) {
    if (data !== undefined && data.attributes !== undefined) {
      return data.attributes;
    }
    return data;
  }


  get(attribute) {
    if (this.attributes.has(attribute)) {
      return this.attributes.get(attribute);
    }
    return null;
  }

  save() {
    return this.store.save(this);
  }

  delete() {
    return this.store.destroy(this);
  }

  isEmpty() {
    return this.status == statuses.EMPTY;
  }

  isBusy() {
    return this.status == statuses.BUSY;
  }

  isOk() {
    return this.status == statuses.OK;
  }

  isError() {
    return this.status == statuses.ERROR;
  }

  toJS() {
    return toJS(this.attributes);
  }

  modelDidUpdate() { }

  andThen(callback) {
    if (this.isOk()) {
      callback && callback(this);
      return this;
    }
    this.onUpdateCallback = callback;
    return this;
  }

  @action
  beginUpdate() {
    this.status = statuses.BUSY;
  }

  @action
  endUpdate(error) {
    if (error) {
      try {
        this.error = error.message ? JSON.parse(error.message) : error;
        this.status = statuses.ERROR;
      }
      catch (err) {
        this.error = error
        this.status = statuses.ERROR;
      }
      this.status = statuses.ERROR;
      this.modelDidUpdate();
    } else {
      this.status = statuses.OK;
      this.modelDidUpdate();
    }
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this, error);
      this.onUpdateCallback = null;
    }
  }

  @action
  afterSetData() { }

  @action
  set(data = {}) {
    const newAttributesMap = data?.data_ || new Map(Object.entries(data));
    this.attributes = this.attributes.merge(this.transformData(newAttributesMap));
    this.attributes.forEach((value, key) => {
      if (this[key] === undefined) Object.defineProperty(this, key, {
        set: (v) => this.attributes.set(key, v),
        get: (v) => this.get(key),
      })
    });
    this.afterSetData();
  }

  @computed
  get isNew() {
    return !this.has(this.primaryKey)
  }
}