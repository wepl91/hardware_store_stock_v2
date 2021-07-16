import { observable, action, makeObservable, runInAction } from 'mobx';
import {
  makePersistable,
} from "mobx-persist-store";
import Store from './Store'
class UIStore extends Store {
  @observable openMenu;
  constructor(adapter, appStore) {
    super(adapter, appStore);
    this.adapter = adapter;
    this.appStore = appStore;
    makeObservable(this);

    makePersistable(
      this, 
      { 
        name: 'ui', 
        properties: ['openMenu'], 
        storage: process.browser && window.localStorage
      }).then(
        action((persistStore) => {
          //console.log(persistStore.isHydrated);
        })
      );
  }

  @action
  toggleMenu() {
    runInAction(() => {
      this.openMenu = !this.openMenu;
    });
  }
}

export default UIStore;