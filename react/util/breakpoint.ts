import { TBreakPoints, IBreakPoints } from './types/breakpoints';

export const breakPoints = ['xl', 'lg', 'md', 'sm'];

export const getBreakPointValues = (options: TBreakPoints): IBreakPoints => {
  if (typeof options === 'number' || typeof options === 'string') {
    return breakPoints.reduce((result, key, index) => ({ ...result, [key]: index === 0 ? options : undefined }), {} as IBreakPoints);
  }
  return options;
};
