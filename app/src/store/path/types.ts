import { Action } from 'redux';

export enum PathActionTypes {
  GET_HOME_PATH = '@@path/GET_HOME_PATH',
  SET_HOME_PATH = '@@path/SET_HOME_PATH',
  SET_HOME_PATH_ERROR = '@@path/SET_HOME_PATH_ERROR',
}

export interface PathState {
  currentPath: string;
  pathArray: string[];
}

export interface GetHomePathAction extends Action {
  type: PathActionTypes.GET_HOME_PATH;
}

export interface SetHomePathAction extends Action {
  type: PathActionTypes.SET_HOME_PATH;
  payload: {
    currentPath: string,
  };
}

export interface SetHomePathErrorAction extends Action {
  type: PathActionTypes.SET_HOME_PATH;
  payload: {
    errorMessage: string,
  };
}

export type PathActions =
  GetHomePathAction |
  SetHomePathAction;
