import { action, observable, computed, makeObservable } from 'mobx';
import { RestClient, LocalStorageClient } from '../utils';
import {
  UIStore,
  ProductsStore,
  ProvidersStore,
} from './';

export default class AppStore {
  @observable isLoading = true;
  @observable loggedInUser = null;
  @observable serviceErrors = [];

  constructor(args) {
    const isServer = typeof window === 'undefined';
    const storedUser = !isServer && localStorage.getItem(this.logged_user_key);

    this.APIClient = new RestClient();
    this.localStorageClient = new LocalStorageClient('hw_st');

    this.stores = new Map();

    this.stores.set('products', new ProductsStore(this.APIClient, this));
    this.stores.set('providers', new ProvidersStore(this.APIClient, this));
    this.stores.set('ui', new UIStore(this.localStorageClient, this));

    this.stores.forEach((store, key) => {
      Object.defineProperty(this, key, {
        get: (v) => store,
      });
    });
    if (storedUser) {
      this.isLoading = false;
      this.users.get(storedUser).andThen((res, err) => {
        if (err) {
          this.signOut();
          this.isLoading = false;
        } else {
          this.setCurrentUser(res);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }

    makeObservable(this);
  }

  @action
  authenticate(user, password) {
    return this.APIClient.authenticate(user, password)
  }

  @action
  signIn(user, password) {
    return this.authenticate(user, password).then(res => {
      this.saveInfo(res)
    });
  }

  @action
  signOut() {
    localStorage.removeItem(this.api_token_key);
    localStorage.removeItem(this.logged_user_key);

    this.APIClient.token = null;
    this.loggedInUser = null;
    this.stores.forEach((store, key) => { store.clear() });
  }

  @action
  saveInfo(data) {
    this.setCurrentUser(this.users.store(data));

    localStorage.setItem(this.api_token_key, this.APIClient.token);
    localStorage.setItem(this.logged_user_key, this.loggedInUser.id);
    localStorage.setItem('language', 'Español');
  }

  @action
  setCurrentUser(user) {
    this.isLoading = false;
    this.loggedInUser = user;
  }

  @computed
  get isLoggedIn() {
    const loggedInUser = this.loggedInUser;
    return this.APIClient.token != null && loggedInUser != null;
  }

  @computed
  get isLoggingIn() {
    const loggedInUser = this.loggedInUser;
    return this.APIClient.token != null && loggedInUser == null;
  }

  @computed
  get loggedInUserKey() {
    if (this.isLoggedIn) {
      return this.loggedInUser.id;
    }
    return null;
  }
}