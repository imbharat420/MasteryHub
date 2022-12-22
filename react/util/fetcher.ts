import fetchFactory from 'utils/fetchFactory';
import BugsnagHelpers from 'utils/bugsnag';
import {
  defaultErrorMessage, RequestHeaders, ResponseStatus,
} from 'configs/constants';

const { storeOptions, notifyMonitoring } = BugsnagHelpers;

const fetch = fetchFactory({
  baseUrl: '',
  withCache: false,
  headers: { [RequestHeaders.platform]: 'website' },
  withDeviceId: true,
  withLanguageHeader: true,
});

const fetcher = (url: string, options?: RequestInit) => {
  storeOptions(url, options);

  return fetch(url, options).then(async response => {
    const responseData = response.clone().json();

    const { message, status, reason } = responseData;

    if (!response.ok) {
      const errorObject = {
        // get error message from body or default to response status
        message: message || reason || defaultErrorMessage,
        request: JSON.parse(sessionStorage.getItem(url) || '[]'),
        response,
      };

      return Promise.reject(errorObject);
    }

    if (status === ResponseStatus.error) {
      const errorObject = {
        message: message || reason || defaultErrorMessage,
        request: JSON.parse(sessionStorage.getItem(url) || '[]'),
        response,
      };

      notifyMonitoring(errorObject);
    }

    return responseData;
  })
    .catch(error => {
      sessionStorage.removeItem(url);
      notifyMonitoring(error);
      console.error(error);
    });
};

export default fetcher;
