// Interceptor idea is taken from https://github.com/werk85/fetch-intercept
import fetch from 'isomorphic-fetch';

import getDeviceId from 'utils/getDeviceId';
import IS_BROWSER from 'utils/isBrowser';

interface IHttpsServiceConfig {
  apiUrl: string;
}

interface IRequestArgs {
  url: string;
  options ?: RequestOptionsType;
}

type RequestOptionsType = RequestInit & {
  skipInterceptors?: boolean;
  withoutLanguageHeader?: boolean;
};

interface IInterceptor {
  request?: (url: string, options?: RequestOptionsType) => IRequestArgs;
  requestError?: (error?: any) => any;
  response?: (response?: Response) => any;
  responseError?: (error?: any) => any;
}

class HttpService {
  static config: IHttpsServiceConfig = {
    apiUrl: '',
  };

  static options: any = {
    headers: {
      'Content-Type': 'application/json',
      ...(getDeviceId() && { deviceid: getDeviceId() }),
    },
  };

  private static interceptors: IInterceptor[] = [];

  private static async modifiedFetch(url: string, options: RequestOptionsType = {}): Promise<any> {
    const response = await fetch(url, options);

    if (response.status < 200 || response.status >= 300) {
      throw response;
    }

    const contentType = response.headers.get('content-type');

    return contentType?.includes('application/json') ? response.json() : {};
  }

  private static attachInterceptor(customFetch: Function, requestUrl: string, requestOptions: RequestOptionsType = {}): Promise<any> {
    const { skipInterceptors } = requestOptions;
    if (skipInterceptors || !HttpService.interceptors.length) {
      return customFetch(requestUrl, requestOptions);
    }

    const reversedInterceptors = HttpService.interceptors.reverse();
    let promise: Promise<any> = Promise.resolve({ url: requestUrl, options: requestOptions });

    // Register request interceptors
    reversedInterceptors.forEach(({ request, requestError }: IInterceptor) => {
      if (request || requestError) {
        promise = promise.then(request && (({ url, options }) => request(url, options)), requestError);
      }
    });

    // Register fetch call
    promise = promise.then(({ url, options }) => customFetch(url, options));

    // Register response interceptors
    reversedInterceptors.forEach(({ response, responseError }: IInterceptor) => {
      if (response || responseError) {
        promise = promise.then(response, responseError);
      }
    });

    return promise;
  }

  static registerInterceptor(interceptor: IInterceptor): () => void {
    HttpService.interceptors.push(interceptor);

    return () => {
      HttpService.interceptors = HttpService.interceptors.filter(item => item !== interceptor);
    };
  }

  static clearInterceptors() {
    HttpService.interceptors = [];
  }

  static setConfig(config: IHttpsServiceConfig) {
    HttpService.config = {
      ...HttpService.config,
      ...config,
    };
    return HttpService;
  }

  static getFormData(data: any) {
    if (IS_BROWSER && data instanceof FormData) {
      return data;
    }
    return JSON.stringify(data);
  }

  static getOptions({ withoutLanguageHeader, ...options }: RequestOptionsType = {}) {
    const reqHeaders = { ...options.headers } || {};
    const initialHeaders = { ...HttpService.options.headers };
    if (withoutLanguageHeader) {
      delete initialHeaders['language-code'];
    }

    if (IS_BROWSER && options.body instanceof FormData) {
      delete initialHeaders['Content-Type'];
    }

    const optionsHeaders = {
      ...initialHeaders,
      ...reqHeaders,
    };

    return {
      ...HttpService.options,
      ...options,
      headers: optionsHeaders,
    };
  }

  static setOptions(options: RequestOptionsType) {
    const headers = { ...(options.headers || {}), ...HttpService.options.headers };

    HttpService.options = { ...HttpService.options, ...options, headers };
  }

  static get(url: string, options: RequestOptionsType = {}) {
    const reqOptions = HttpService.getOptions({ ...options, method: 'GET' });
    return HttpService.fetch(url, reqOptions);
  }

  static post(url: string, data: any, options: RequestOptionsType = {}) {
    const reqOptions = HttpService.getOptions({
      ...options,
      method: 'POST',
      body: HttpService.getFormData(data),
    });

    return HttpService.fetch(url, reqOptions);
  }

  static put(url: string, data: any, options: RequestOptionsType = {}) {
    const reqOptions = HttpService.getOptions({
      ...options,
      method: 'PUT',
      body: HttpService.getFormData(data),
    });

    return HttpService.fetch(url, reqOptions);
  }

  static delete(url: string, data: any, options: RequestOptionsType = {}) {
    const reqOptions = HttpService.getOptions({
      ...options,
      method: 'DELETE',
      body: HttpService.getFormData(data),
    });

    return HttpService.fetch(url, reqOptions);
  }

  static fetch(url: string, options: RequestOptionsType) {
    return HttpService.attachInterceptor(HttpService.modifiedFetch, url, options);
  }
}

export default HttpService;
