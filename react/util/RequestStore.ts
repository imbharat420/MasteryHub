class RequestStore {
  static store = new Map();

  static get(hash: string) {
    if (RequestStore.has(hash)) {
      return RequestStore.store.get(hash);
    }
  }

  static set(hash: string, request: any) {
    if (!RequestStore.has(hash)) {
      RequestStore.store.set(hash, request);
    }
  }

  static has(hash: string) {
    return RequestStore.store.has(hash);
  }

  static drop(hash: string) {
    if (RequestStore.has(hash)) {
      RequestStore.store.delete(hash);
    }
  }
}

export default RequestStore;
