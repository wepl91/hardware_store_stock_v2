import {
  observable,
  action,
} from 'mobx'

import {
  FirebaseClient
} from './Firebase';

export default class RESTClient {
  constructor() { }

  @action
  authenticate(user, password, authPath = '/login') {}

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
            let prod = Object.assign({}, doc.data(), { id: doc.id })
            results.push(prod);
          });
          resolve(results)
        })
    });
  }

  get(uriPath, id = null) {}

  post(uriPath, item) {
    const created = moment();
    item['created_at'] = created.toISOString();
    return new Promise((resolve, reject) => {
      FirebaseClient.collection(uriPath)
        .add(item)
        .then(newItem => {
          incrementCounter()
            .then(response => resolve(newItem))
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  put(uriPath, item, itemId = null) {}

  delete(uriPath, id) {
    return new Promise( async (resolve, reject) => {
      await FirebaseClient.collection(uriPath).doc(id).delete();
      //await decrementCounter();
      resolve(id);
    });
  }
}