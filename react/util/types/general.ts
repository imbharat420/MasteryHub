import {
  FC,
  ReactNode,
  Component,
  MutableRefObject,
  MemoExoticComponent,
} from 'react';
import { TExperimentVersion } from 'containerComponents/HeaderCommon/types';

import { IPreviewAll } from 'containers/Sidebar';
import { IImageObject } from 'utils/types/image';
import { ISidebarImage } from 'containers/Sidebar/types';
import { ANALITICS_SOURCES } from 'configs/constants';

export { VideoAspectRatioTypes } from 'components/VideoPlayer/types';

declare global {
  interface Window {
    customModal: {
      alert: (title: string, text?: string, option?: any) => Promise<any>;
      confirm: (title: string, text?: string, option?: any) => Promise<any>;
      custom: (component: MemoExoticComponent<any> | Component<any> | FC<any>, option?: any) => Promise<any>;
    };
    google: any;
  }
}

export type TWrapPromiseParams = {
  status: string;
  response: TAnyObject | undefined;
  setStatus: (status: string) => void,
  setResponse: (response: TAnyObject | undefined) => void,
}
export type fetchType = 'images' | 'stickers';

export type AuthViewType = 'signIn' | 'signUp';

export type TClassnames = string | { [key: string]: boolean };

export type RestrictionMetaData = {
  restricted_words: [];
  restricted_type: string;
  message: {
    text: string;
    action: string;
    action_title: string;
  };
};

export interface IData {
  response: ISidebarImage[];
  search_id: number;
  status: string;
  metadata: {
    next_page: string;
    restrictionInfo?: RestrictionMetaData
  }
}

export interface ILifeCycleWrapper {
  onMount: () => void;
  onUnmount: () => void;
  children: ReactNode;
}

export interface IFetchData {
  nextUrl: string;
  isLoading: boolean;
  isError: boolean;
  data: IFetchDataItem[];
}

export interface IFetchDataItem {
  [key: string]: any;

  comments_count?: number;
  created?: string;
  forks_count?: number;
  has_similars?: boolean;
  height?: number;
  id: number | string;
  license?: string;
  likes_count?: number;
  mature?: boolean;
  public?: boolean;
  reposts_count?: number;
  show_edit_history?: boolean;
  sources_count?: number;
  streams_count?: number;
  tags?: string[];
  title?: string;
  type?: string;
  url: string;
  user?: {
    id: number,
    is_verified: boolean,
    name: string,
    photo: string,
    username: string
  };
  views_count?: number;
  width?: number;
  preview_url?: string;
  locked?: boolean;
  is_public?: boolean;
  user_id?: number;
  preview_all?: IPreviewAll[];
  items_count?: number;
  data_url?: string;
}

export interface ICashScroll {
  [key: string]: {
    nextUrl?: string | null,
    data?: IImageObject[],
    position?: number
  }
}

export type TAnyObject = { [key: string]: any };

export type IReactRef = ((instance: HTMLDivElement | null) => void) | MutableRefObject<HTMLDivElement | null> | null;

// 0 for all types, 1 commercial use
export enum UsageType {
  all = 0,
  commercial = 1,
}

export interface IFilterData {
  [key: string]: string;
  title: string;
  id: string;
  size: string;
  iconSize: string;
  'aria-label': string;
}

export enum ExperimentId {
  hideNewModal = '0',
  showNewModal = '1',
}

export interface IEmptyResults {
  onEmptyResults?: () => void;
}

type AnalyticsKeys = keyof typeof ANALITICS_SOURCES;

export type IAnalyticsSourceType = typeof ANALITICS_SOURCES[AnalyticsKeys];

export interface IGoldUserState {
  isUserGold: boolean;
  hideNavigationImages?: boolean;
  experimentVersion?: TExperimentVersion;
}

export interface IImgInfo {
  id: string | number;
  url: string;
  type: string;
  isEmpty?: boolean;
  generateImgUrl?: boolean;
  data_url: string;
}

export interface ITextStyle {
  commercial: boolean;
  type: string;
  url: string;
  id: string;
  license: string;
  is_paid: boolean;
  text_settings: {
    texture_resource?: {
      resource_url?: string;
      resource_id?: string;
      source_type?: string;
      type?: string;
    };
    title: string;
    shadow_offset_x?: number;
    letter_spacing?: number;
    shadow_amount?: number;
    line_spacing?: number;
    opacity?: number;
    stroke_color?: string;
    shadow_offset_y?: number;
    fill_color?: string;
    stroke_width?: number;
    bend?: number;
    blendmode?: string;
    shadow_opacity?: number;
    shadow_color?: string;
  },
  font_resource: {
    package: string;
    resource_url: string;
    resource_id: string;
    source_type: string;
    type: string;
    license: string;
    is_paid: boolean;
  },
}

export enum USER_SUBSCRIPTION_TYPES {
  freeUser = 'freeUser',
  goldUser = 'goldUser',
  canceledNotExpiredUser = 'canceledNotExpiredUser',
}

export interface UserModel {
  id?: number;
  key?: string;
  name?: string;
  username?: string;
  photo?: string;
  is_activated?: boolean;
  email?: string;
  email_encoded?: string;
  is_new?: boolean;
  badge?: string;
  registration_flow?: string;
  reason?: string;
  subscribed?: boolean;
  subscription?: {
    is_trial_used?: boolean;
    granted: boolean;
  };
  status_message?: string;
  registered?: boolean;
  has_password?: boolean;
  isTrialUsed?: boolean;
  account_type?: string;
  is_verified?: boolean;
  created?: string;
  teams?: ITeams[];
  default_profile_pic?: boolean;
  provider?: string;
  user?: {}
}

export interface IUserInfo {
  message?: string;
  type?: string;
}

export interface UserResponse {
  status?: 'success' | 'error';
  user?: UserModel;
  reason?: string;
  response?: UserModel; // userInfo is in response field during signIn and signUp
  message?: string;
  removal_info?: UserTerminatedModel;
  additional_info?: {
    password?: IUserInfo[];
    email?: IUserInfo[];
  };
}

export interface UserTerminatedModel {
  tc_link_text?: string;
  cg_link_text?: string;
  description?: string;
  title?: string;
}

interface ITeams {
  id: string;
  name: string;
  role: 'owner' | 'default';
  subscription: {
    subscribed: boolean;
    trial_used: boolean;
  }
}
