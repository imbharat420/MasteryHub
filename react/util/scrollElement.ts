interface ScrollToOptions {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
}
const scrollElement = (element: HTMLElement | null, options: ScrollToOptions) => {
  if (!element) {
    return;
  }

  if (typeof element.scrollTo === 'function') {
    element.scrollTo(options);
    return;
  }

  if (options.top !== undefined) {
  // eslint-disable-next-line no-param-reassign
    element.scrollTop = options.top;
  }
};

export default scrollElement;