import {
  observable,
  action,
  makeObservable,
} from 'mobx';
import moment from 'moment';

import { Collection } from '../utils';

import { hashCode } from '../utils/Helper';

export default class Store {
  @observable items = new Collection(this);
  @observable views = new Map();

  model = null;
  appStore = null;
  adapter = null;
  urlRoot = null;

  constructor(adapter, appStore) {
    makeObservable(this);
    this.adapter = adapter;
    this.appStore = appStore;
  }

  get modelRoot() {
    if (this.urlRoot) return this.urlRoot;
    const ModelClass = this.model;
    this.urlRoot = (new ModelClass({}, this)).urlRoot;
    return this.urlRoot;
  }

  view(viewName) {
    let view;
    if (!this.views.has(viewName)) {
      view = new Collection(this, viewName);
      this.views.set(viewName, view);
    } else {
      view = this.views.get(viewName);
    }
    return view;
  }

  getDummy(length = 1) {
    const ModelClass = this.model;
    if (length <= 1) {
      return new ModelClass({}, this);
    } else {
      return Array.from(Array(length)).map(() => (new ModelClass({}, this)));
    }
  }

  getNew(attrs = {}) {
    const ModelClass = this.model;
    const newModel = new ModelClass(attrs, this);
    newModel.status = 'ok';
    return newModel;
  }

  @action
  getAll(limit = 1000) {
    return this.search({ per_page: limit }, 'all', true);
  }

  @action
  search(filters = {}, viewName = 'default', forceRefresh = false, apiPath = null) {
    const viewFullName = `${viewName}-${hashCode(JSON.stringify(filters))}-${this.appStore && moment().toISOString()}`;
    const view = this.view(viewFullName);
    const url = `${apiPath || this.modelRoot}`;
    view.beginUpdate();
    if (forceRefresh || view.needsUpdate()) {
      const ModelClass = this.model;
      this.adapter.search(url, filters)
        .then((res) => {
          view.clear();
          const items = res;
          if (Array.isArray(items)) {
            items.forEach((item) => view.add(this.items.addOrUpdateModel(new ModelClass(item, this), this)));
          } else {
            view.add(this.items.addOrUpdateModel(new ModelClass(items, this)));
          }
          view.endUpdate();
          return view;
        })
        .catch((error) => view.endUpdate(error));
    }
    return view;
  }


  @action
  get(id, forceRefresh = false, onFetch = null) {
    const ModelClass = this.model;
    let item = this.items.find(id);
    if (!item) {
      item = new ModelClass({ id: id }, this);
      this.items.add(item);
    }
    if (forceRefresh || item.needsUpdate()) {
      item.beginUpdate();
      this.adapter.get(this.modelRoot, id)
        .then((res) => {
          this.items.addOrUpdateModel(new ModelClass(res, this));
          item.endUpdate();
          onFetch && onFetch(item);
        })
        .catch((error) => item.endUpdate(error))
    }
    return item;
  }


  @action
  save(model) {
    model.beginUpdate();
    if (model.isNew) {
      this.adapter.post(this.modelRoot, model)
        .then((res) => {
          if (res) {
            model.id = res.id;
            this.items.addOrUpdateModel(model);
          }
        })
        .catch((error) => model.endUpdate(error))
    } else {
      this.adapter.put(this.modelRoot, model)
        .then((res) => {
          model.set(res);
          this.items.addOrUpdateModel(model)
          model.endUpdate();
        })
        .catch((error) => model.endUpdate(error));
    }
    return model;
  }

  @action
  destroy(model, apiPath = null) {
    model.beginUpdate();
    this.adapter.delete(apiPath || this.modelRoot, model.id)
      .then((res) => {
        this.items.addOrUpdateModel(model);
      },
        (err) => {
          model.endUpdate(err);
        });
  }

  @action
  store(json) {
    const ModelClass = this.model;
    let item = this.items.find(json.id);
    if (item === undefined) {
      item = new ModelClass({ id: json.id }, this);
      this.items.add(item);
    }
    item.beginUpdate();
    this.items.addOrUpdateModel(new ModelClass(json, this));
    item.endUpdate();

    return item;
  }

  @action
  clear() {
    this.items.clear();
    this.views.forEach((view, key) => { view.clear(); });
    this.views.clear();
  }


}