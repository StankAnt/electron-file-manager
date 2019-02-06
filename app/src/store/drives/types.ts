import { Action } from 'redux';
import { DriveObject } from 'types/objects';

export enum DrivesActionTypes {
  GET_DRIVES_LIST = '@@drives/GET_DRIVES_LIST',
  SET_DRIVES_LIST = '@@drives/SET_DRIVES_LIST',
  SET_DRIVES_LIST_ERROR = '@@drives/SET_DRIVES_LIST_ERROR',
}

export interface DrivesState {
  drivesList: DriveObject[];
}

export interface GetDrivesListAction extends Action {
  type: DrivesActionTypes.GET_DRIVES_LIST;
}

export interface SetDrivesListAction extends Action {
  type: DrivesActionTypes.SET_DRIVES_LIST;
  payload: {
    drivesList: DriveObject[],
  };
}

export interface SetDrivesListErrorAction extends Action {
  type: DrivesActionTypes.SET_DRIVES_LIST_ERROR;
  payload: {
    errorMessage: string,
  };
}

export type DrivesActions =
  GetDrivesListAction |
  SetDrivesListAction;
