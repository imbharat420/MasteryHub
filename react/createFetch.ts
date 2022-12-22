import fetch from 'isomorphic-fetch';

import { getCookie } from 'utils/cookie';
import LRU from 'utils/LRUCache';
import { CURRENT_LANGUAGE_COOKIE_NAME } from 'configs/constants';

import getDeviceId from './getDeviceId';
import RequestStore from './RequestStore';
import { TAnyObject } from './types';

interface ICreateFetch extends RequestInit{
  baseUrl?: string;
  useCache?: boolean;
  timeout?: number | undefined;
  isFormData?: boolean;
  withoutLanguageHeader?: boolean;
  useJSONMethod?: boolean;
  withoutDeviceId?: boolean;
}

interface IRequestOptions extends Omit<RequestInit, 'headers'> {
  headers: TAnyObject;
}
const lruCache = new LRU(10);
const makeUnique = (url: string, method: string, data: ICreateFetch) => `${url}-${method}-${data}`;

const handleRequest = (url: string, method: string, options: ICreateFetch, useCache = true, useJSONMethod = true) => {
  const canUseCache = useCache && method === 'GET';
  if (canUseCache && lruCache.has(url)) {
    return lruCache.read(url);
  }
  const hash = makeUnique(url, method, options);

  const request = RequestStore.has(hash)
    ? RequestStore.get(hash)
    : fetch(url, options);

  RequestStore.set(hash, request);

  return request.then((res: Response) => (useJSONMethod ? res.clone().json() : res))
    .then((data:Response) => {
      RequestStore.drop(hash);

      if (canUseCache && data.status === 200) {
        lruCache.set(url, data);
      }

      return data;
    });
};

const createFetch = (instanceOptions: ICreateFetch = {}) => {
  const { baseUrl = '', useCache = true } = instanceOptions;

  return (url: string, options: ICreateFetch) => {
    const {
      timeout = instanceOptions.timeout,
      isFormData,
      body,
      method = 'GET',
      withoutLanguageHeader = false,
      withoutDeviceId = false,
      useJSONMethod = true,
    } = options;

    let timer: ReturnType<typeof setTimeout>;

    const requestOptions: IRequestOptions = {
      ...instanceOptions,
      ...options,
      headers: {
        Accept: 'application/json',
        ...(instanceOptions.headers || {}),
        ...(options.headers || {}),
      },
      method,
    };

    if (!withoutLanguageHeader) {
      const currentLanguage = getCookie(CURRENT_LANGUAGE_COOKIE_NAME);

      requestOptions.headers['language-code'] = currentLanguage;
    }

    if (!withoutDeviceId) {
      getDeviceId() && (requestOptions.headers.deviceId = getDeviceId());
    }

    if (body) {
      requestOptions.body = isFormData ? body : JSON.stringify(body);
    }

    return new Promise<Response>((resolve, reject) => {
      if (instanceOptions.timeout && AbortController) {
        const controller = new AbortController();
        const { signal } = controller;

        timer = setTimeout(() => {
          reject(new Error('Timeout for Promise'));
          controller.abort();
        }, timeout);

        requestOptions.signal = signal;
      }

      return handleRequest(`${baseUrl}${url}`,
        method,
        { ...instanceOptions, ...requestOptions },
        useCache,
        useJSONMethod)
        .then(resolve, reject)
        .finally(() => clearTimeout(timer));
    });
  };
};

export default createFetch;
export { fetch };
