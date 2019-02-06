import { ActionCreator } from 'redux';
import { GetHomePathAction, PathActionTypes, SetPathAction } from './types';

export const getHomePath: ActionCreator<GetHomePathAction> = () => {
  return {
    type: PathActionTypes.GET_HOME_PATH,
  };
};

export const setPath: ActionCreator<SetPathAction> = (path: string) => ({
  payload: {
    currentPath: path,
  },
  type: PathActionTypes.SET_PATH,
});
