import { ActionCreator } from 'redux';
import { DriveObject } from 'types/objects';
import { DrivesActionTypes, GetDriveListAction, SetDriveListAction } from './types';

export const getDrivesList: ActionCreator<GetDriveListAction> = () => {
  return {
    type: DrivesActionTypes.GET_DRIVES_LIST,
  };
};

export const setDriveList: ActionCreator<SetDriveListAction> = (drives: DriveObject[]) => ({
  payload: {
    drivesList: drives,
  },
  type: DrivesActionTypes.SET_DRIVES_LIST,
});
