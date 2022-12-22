import { createModel } from 'event-storm';

import { configs } from 'configs/constants';
import { getSelectors } from 'store/external';
import { getLayersSlice, getHistory } from 'store/selectors/layers';
import { setSerializedState, setSerializedHistory } from 'utils/common/providedStorageMethods';

const registerRestoreListener = () => {
  const handler = () => {
    const serializedState = JSON.stringify(getSelectors(getLayersSlice));
    const serializedHistory = JSON.stringify(getSelectors(getHistory));
    setSerializedState(serializedState);
    setSerializedHistory(serializedHistory);
  };
  window.addEventListener('beforeunload', handler);
  return () => {
    window.removeEventListener('beforeunload', handler);
  };
};

configs.restoreState && registerRestoreListener();

export const restoreModel = createModel(false, {});

let unsubscribe: null | (() => void) = null;

restoreModel.subscribe(value => {
  if (value && !unsubscribe) {
    unsubscribe = registerRestoreListener();
  } else {
    unsubscribe?.();
  }
});
