import { pictureTo } from 'models/img';
import { TAnyObject } from 'utils/types/index';

export interface IImageObject {
  url: string;
  id: string | number;
  from?: string;
  license?: string,
  index?: number;
  searchId?: string;
  fileName?: string;
}

export interface IUploadRes {
  status: string;
  url?: string;
  message?: string;
  fileName: string;
  mimeType?: string;
}

export type ImageSrcParams = {
  src: string;
  action: pictureTo;
  r: any;
  type: string | null;
  cdnQueryParams?: TAnyObject;
}
export type GetImageSource = (params: ImageSrcParams) => string;

export type SVGType = (pattern: string) => boolean;

export type GetSourceFormatType = (format?: string) => string | undefined;

export enum ActionTypes {
  fixed = 'fixed',
  crop = 'crop',
  min = 'min',
  max = 'max',
}
export enum FileUploadTypes {
  image = 'image',
  font = 'font',
}

export type UploaderClickCallback = () => void;
