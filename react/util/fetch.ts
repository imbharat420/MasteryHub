import getDeviceId from 'utils/getDeviceId';

import RequestStore from './RequestStore';

const makeUnique = (url: string, method: string, data: any) => `${url}-${method}-${data}`;

const cachedResults = new Map();
class Fetch {
  static async get(url: string, headers?: any, signal?: any, useCache?: boolean) {
    if (!url) return {};
    return Fetch.request(url, 'GET', null, headers, signal, useCache);
  }

  static async post(url: string, data: any, headerData? : any, signal?: any) {
    if (!url) return {};
    return Fetch.request(url, 'POST', data, headerData, signal);
  }

  static async delete(url: string, data: any, headerData? : any) {
    if (!url) return {};
    return Fetch.request(url, 'DELETE', data, headerData);
  }

  static async request(url: string, method: string, data: any, headerData?: any, signal?: any, useCache = true) {
    const headers = {
      'Content-Type': 'application/json',
      platform: 'website',
      ...(getDeviceId() && { deviceid: getDeviceId() }),
      ...headerData,
    };

    const body = (method !== 'GET') ? JSON.stringify(data) : null;

    const response = await Fetch.handleCacheRequest(url, method, headers, body, signal, useCache);

    const result = await response.clone().json();

    return {
      headers: response.headers,
      ...result,
    };
  }

  static errorHandler(url: string, response: Response) {
    if (response.status === 200) {
      cachedResults.set(url, response);
    }
    return response;
  }

  static async handleCacheRequest(url: string, method: string, headers: any, body: any, signal?: any, useCache = true) {
    if (method === 'GET' && useCache && cachedResults.has(url)) {
      return cachedResults.get(url);
    }
    const hash = makeUnique(url, method, body);

    const request = RequestStore.has(hash)
      ? RequestStore.get(hash)
      : fetch(url, {
        method,
        headers,
        body,
        signal,
      });

    RequestStore.set(hash, request);

    const response = await request;

    RequestStore.drop(hash);

    return Fetch.errorHandler(url, response);
  }
}

export default Fetch;
