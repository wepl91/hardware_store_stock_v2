import { observable, action, toJS, makeObservable } from 'mobx';
import { statuses } from './constants';

export default class Collection {
  @observable items = new Map();
  @observable status;

  store;
  error;
  onUpdateCallback;
  onCollectionUpdate;
  view;

  constructor(store, view) {
    this.status = statuses.EMPTY;
    this.store = store;
    this.view = view;

    makeObservable(this);
  }

  toJS() {
    return toJS(this.items);
  }

  toArray() {
    let arr = [];
    this.items.forEach(i => arr.push(i));
    return arr;
  }

  get length() {
    return this.items.size;
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

  find(id) {
    return this.items.get(id.toString());
  }

  collectionDidUpdate() {
    this.onCollectionUpdate && this.onCollectionUpdate();
  }

  andThen(callback) {
    if (this.isOk()) {
      callback && callback(this);
      return this;
    }
    this.onUpdateCallback = callback;
    return this;
  }

  @action
  clear() {
    this.items.clear();
  }

  @action
  add(model) {
    this.items.set(model.id.toString(), model);
  }

  @action
  addOrUpdateModel(model) {
    const modelID = model.id;
    if (this.items.has(modelID.toString())) {
      let storedModel = this.items.get(modelID.toString());
      storedModel.set(model.attributes);
      storedModel.endUpdate();
      return storedModel;
    } else {
      this.add(model);
      model.endUpdate();
      return model;
    }
  }

  @action
  beginUpdate() {
    this.status = statuses.BUSY;
  }

  @action
  endUpdate(error) {
    if (error) {
      this.error = error;
      this.status = statuses.ERROR;
    } else {
      this.status = statuses.OK;
      this.collectionDidUpdate();
    }
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this, error);
      this.onUpdateCallback = null;
    }
  }

  @action
  getStatus () { return this.status; }
}