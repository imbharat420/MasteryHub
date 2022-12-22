export const isLeftClickWithNoExtraKeys = (event: any) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }
  if ('buttons' in event && event.buttons > 0) {
    return event.buttons === 1;
  }
  return event?.button === 0;
};
