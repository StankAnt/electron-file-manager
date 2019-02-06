import { Action } from 'redux';

export enum PathActionTypes {
  GET_HOME_PATH = '@@path/GET_HOME_PATH',
  SET_PATH = '@@path/SET_PATH',
  SET_PATH_ERROR = '@@path/SET_PATH_ERROR',
}

export interface PathState {
  currentPath: string;
  pathArray: string[];
}

export interface GetHomePathAction extends Action {
  type: PathActionTypes.GET_HOME_PATH;
}

export interface SetPathAction extends Action {
  type: PathActionTypes.SET_PATH;
  payload: {
    currentPath: string,
  };
}

export interface SetPathErrorAction extends Action {
  type: PathActionTypes.SET_PATH_ERROR;
  payload: {
    errorMessage: string,
  };
}

export type PathActions =
  GetHomePathAction |
  SetPathAction;
