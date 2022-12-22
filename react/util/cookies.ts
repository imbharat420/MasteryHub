import IS_BROWSER from 'utils/isBrowser';

const getCookie = (name: string) => {
  if (!IS_BROWSER) {
    return null;
  }

  const pair = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return !pair ? null : pair[1];
};

const setCookie = (key: string, value: string | number, path: string = '/', maxAge?: number) => {
  if (!IS_BROWSER) {
    return;
  }
  document.cookie = `${key}=${value}; ${maxAge ? `Max-Age=${maxAge};` : 'expires=Fri, 31 Dec 9999 23:59:59 GMT;'} path=${path}`;
};

const deleteCookie = (key: string, paths: string[] = ['/']) => {
  paths.forEach(path => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  });
};

export { getCookie, setCookie, deleteCookie };
