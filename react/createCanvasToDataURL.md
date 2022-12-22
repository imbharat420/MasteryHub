```ts
import { IRect } from '@picsart/web-layering/types';

import { mimeType } from 'types';
import { getLayeringUtils } from 'pages/Editor/layeringSetup';
import { getSelectors } from 'store/external';
import { getAllEmptyCollageCellIds, getCurrentBaseGroupId } from 'store/selectors/layers';
import getWMLayersIds from 'utils/canvas/getWMLayersIds';

const createCanvasDataURL = (
  type: mimeType,
  qualityValue: number,
  canvasMetrics: IRect,
  withoutWatermark: boolean = false,
) => {
  const {
    width, height, x, y,
  } = canvasMetrics;

  const config = {
    x,
    y,
    width,
    height,
    mimeType: type,
    quality: qualityValue / 100,
  };

  const {
    currentBaseGroupId,
    emptyCollageCellIds,
  } = getSelectors(state => ({
    currentBaseGroupId: getCurrentBaseGroupId(state),
    emptyCollageCellIds: getAllEmptyCollageCellIds(state),
  }));

  const excludeIds = [...(withoutWatermark ? getWMLayersIds() : []), ...emptyCollageCellIds];
  return getLayeringUtils().layerToDataUrl({ id: currentBaseGroupId, config, excludeIds });
};

export default createCanvasDataURL;
```