import { ActionCreator } from 'redux';
import { DriveObject } from 'types/objects';
import { DrivesActionTypes, GetDrivesListAction, SetDrivesListAction } from './types';

export const getDrivesList: ActionCreator<GetDrivesListAction> = () => {
  return {
    type: DrivesActionTypes.GET_DRIVES_LIST,
  };
};

export const setDrivesList: ActionCreator<SetDrivesListAction> = (drives: DriveObject[]) => ({
  payload: {
    drivesList: drives,
  },
  type: DrivesActionTypes.SET_DRIVES_LIST,
});
