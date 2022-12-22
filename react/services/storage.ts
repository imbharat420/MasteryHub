/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable guard-for-in */

import IS_BROWSER from 'utils/isBrowser';
// import Logger from 'services/logger';

const isLocalStorageAvaulablte = () => {
  try {
    return window.localStorage && window.localStorage ? window.localStorage : fakeStorage;
  } catch (e) {
    return fakeStorage;
  }
};
// new version
const fakeStorage = (function () {
  let storage = new Map();
  return {
    getItem: (key: string) => storage.get(key),
    setItem: (key: string, value: any) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage = new Map(),
  };
}());

class Storage {
  static existMessage = 'there already exists data in storage with this key: %c__key__';

  static notFoundMessage = 'there is not found any existing data in storage with this key: %c__key__';

  static printMessageStyle = 'font-weight: bold; font-size: 12px';

  static notAllowedTypes = ['function', 'symbol', 'bigint'];

  static storage = IS_BROWSER && isLocalStorageAvaulablte() || fakeStorage;

  static generateKey = (name: string, key: string) => `${name}${key}`;

  static replacer = (key: string | number, value: any, withConsole: boolean = true) => {
    const typeOfValue = typeof value;
    if (Storage.notAllowedTypes.includes(typeOfValue)) {
      // Logger.info(`key: ${key} is type of ${typeOfValue}, such values are being either omitted or changed to null`, withConsole);
    }
    return value;
  }

  public set = async (name: string, key: string, data: any, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    return new Promise(resolve => {
      setTimeout(() => {
        if (Storage.storage.getItem(storageKey)) {
          const message = Storage.existMessage.replace('__key__', storageKey);
          // Logger.info(message, withConsole, Storage.printMessageStyle);
          return resolve({
            error: true,
            message,
          });
        }
        Storage.storage.setItem(storageKey, Storage.handleData(data));
        resolve({
          error: false,
          message: '',
        });
      }, 0);
    });
  }

  public put = async (name: string, key: string, data: any, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    return new Promise(resolve => {
      setTimeout(() => {
        if (!Storage.storage.getItem(storageKey)) {
          const message = Storage.notFoundMessage.replace('__key__', storageKey);
          // Logger.info(message, withConsole, Storage.printMessageStyle);
          return resolve({
            error: true,
            message,
          });
        }
        Storage.storage.setItem(storageKey, Storage.handleData(data));
        resolve({
          error: false,
          message: '',
        });
      }, 0);
    });
  }

  public get = async (name: string, key: string, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    return new Promise(resolve => {
      setTimeout(() => {
        let returnValue = Storage.storage.getItem(storageKey);
        try {
          returnValue = JSON.parse(returnValue);
        } catch (e) {
          // Logger.error(e as string, withConsole);
        }
        if (returnValue) {
          return resolve({ error: false, message: '', date: returnValue });
        }
        const message = Storage.notFoundMessage.replace('__key__', storageKey);
        // Logger.info(message, withConsole, Storage.printMessageStyle);
        return resolve({ error: true, message, date: null });
      }, 0);
    });
  }

  public remove = async (name: string, key: string) => {
    const storageKey = Storage.generateKey(name, key);
    return new Promise(resolve => {
      setTimeout(() => {
        Storage.storage.removeItem(storageKey);
        return resolve({
          error: false,
          message: '',
        });
      }, 0);
    });
  }

  public clear = async () => new Promise(resolve => {
    setTimeout(() => {
      Storage.storage.clear();
      return resolve({
        error: false,
        message: '',
      });
    }, 0);
  });

  public setSync = (name: string, key: string, data: any, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    if (Storage.storage.getItem(storageKey)) {
      // const message = Storage.existMessage.replace('__key__', storageKey);
      // Logger.info(message, withConsole, Storage.printMessageStyle);
      return;
    }
    Storage.storage.setItem(storageKey, Storage.handleData(data));
  }

  public putSync = (name: string, key: string, data: any, isAnalytic?: boolean, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    // if (!Storage.storage.getItem(storageKey)) {
    //   // const message = Storage.notFoundMessage.replace('__key__', storageKey);
    //   // Logger.info(message, withConsole, Storage.printMessageStyle);
    // }
    // @ts-ignore
    const realData = isAnalytic ? data?.filter((item, i, self) => self.findIndex(v2 => (v2?.event?.data?.filterId === item?.event?.data?.filterId)) === i) : data;
    Storage.storage.setItem(storageKey, Storage.handleData(realData));
  }

  public getSync = (name: string, key: string, withConsole: boolean = true) => {
    const storageKey = Storage.generateKey(name, key);
    const returnValue = Storage.storage.getItem(storageKey);
    if (!returnValue) {
      // const message = Storage.notFoundMessage.replace('__key__', storageKey);
      // Logger.info(message, withConsole, Storage.printMessageStyle);
      return;
    }

    try {
      return JSON.parse(returnValue);
    } catch {
      return returnValue;
    }
  }

  public removeSync = (name: string, key: string) => {
    const storageKey = Storage.generateKey(name, key);
    Storage.storage.removeItem(storageKey);
  }

  public clearSync = () => {
    Storage.storage.clear();
  };

  static handleData(data: any) {
    return JSON.stringify(data, Storage.replacer);
  }

  public removeItem = (name: string, key: string) => {
    Storage.storage.removeItem(key);
  }
}

const storageApi: { [key: string]: any } = new Storage();

export default storageApi;
