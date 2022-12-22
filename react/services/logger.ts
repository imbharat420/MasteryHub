import isDev from 'utils/isDev';
/* eslint-disable no-console */

class Logger {
  static info(message: string, style?: string): void {
    isDev && console.info(message, style);
  }

  static success(message: string): void {
    isDev && console.log(`%c ${message}`, 'color:green');
  }

  static error(message: string): void {
    isDev && console.trace(message);
  }

  static warn(message: string): void {
    isDev && console.warn(message);
  }

  static deprecate(message: string): void {
    isDev && console.warn('DEPRECATION::: ', message);
  }
}

export default Logger;
