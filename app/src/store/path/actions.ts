import { ActionCreator } from 'redux';
import { GetHomePathAction, PathActionTypes, SetHomePathAction } from './types';

export const getHomePath: ActionCreator<GetHomePathAction> = () => ({
  type: PathActionTypes.GET_HOME_PATH,
});

export const setHomePath: ActionCreator<SetHomePathAction> = (path: string) => ({
  payload: {
    currentPath: path,
  },
  type: PathActionTypes.SET_HOME_PATH,
});
