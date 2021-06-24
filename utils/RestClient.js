import {
  action,
} from 'mobx'

import {
  FirebaseClient
} from './Firebase';

import moment from 'moment';

export default class RESTClient {
  constructor() { }

  @action
  authenticate(user, password, authPath = '/login') { }

  search(uriPath, filters = {}) {
    return new Promise((resolve, reject) => {
      const results = [];
      let index = 0;

      if (filters.page && filter.page > 1) {
        index = (page - 1) * 20;
      }
      FirebaseClient.collection(uriPath)
        .orderBy(filters.orderBy || 'name')
        .startAt(index)
        .limit(20)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve([])
          }
          snapshot.forEach(doc => {
            let item = {
              ...doc.data(),
              ...{ id: doc.id }
            }
            results.push(item);
          });
          resolve(results)
        })
    });
  }

  get(uriPath, id = null) {
    return new Promise((resolve, reject) => {
      FirebaseClient
        .collection(uriPath)
        .doc(id)
        .get()
        .then(snapshot => {
          const item = {
            ...snapshot.data(),
            ...{ id: snapshot.id }
          };
          resolve(item);
        })
        .catch((error) => reject(error))
    })
  }

  post(uriPath, item) {
    const created = moment();
    item['created_at'] = created.toISOString();
    const itemObject = item.toJson();
    delete itemObject.id;
    return new Promise((resolve, reject) => {
      FirebaseClient.collection(uriPath)
        .add(itemObject)
        .then(newItem => {
          resolve({
            ...itemObject,
            ... { id: newItem.id }
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  put(uriPath, item, itemId = null) {
    const now = moment();
    const itemObject = item.toJson();
    itemObject['updated_at'] = now.toISOString();
    return new Promise((resolve, reject) => {
      FirebaseClient
        .collection(uriPath)
        .doc(itemObject.id)
        .update(itemObject)
        .then(() => {
          resolve(item);
        })
        .catch((error) => reject(error));
    })
  }

  delete(uriPath, id) {
    return new Promise(async (resolve, reject) => {
      await FirebaseClient.collection(uriPath).doc(id).delete();
      //await decrementCounter();
      resolve(id);
    });
  }
}