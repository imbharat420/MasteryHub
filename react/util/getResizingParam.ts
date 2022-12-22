const getResizingParams = (originalWidth: number, originalHeight: number, resizeWidth: number, resizeHeight: number) => {
  const ratio = Math.max(originalWidth / resizeWidth, originalHeight / resizeHeight);
  const fromX = (resizeWidth - originalWidth / ratio) / 2;
  const fromY = (resizeHeight - originalHeight / ratio) / 2;
  return {
    fromX,
    fromY,
    width: originalWidth / ratio,
    height: originalHeight / ratio,
  };
};

export default getResizingParams;