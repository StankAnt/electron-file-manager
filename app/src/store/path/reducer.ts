import { Reducer } from 'redux';
import { PathActions, PathActionTypes, PathState } from './types';

const initialState: PathState = {
  currentPath: '',
  pathArray: [],
};

const reducer: Reducer<PathState, PathActions> = (state: PathState = initialState, action: PathActions) => {
  switch (action.type) {
    case PathActionTypes.SET_PATH:
      return {
        ...state,
        currentPath: action.payload.currentPath,
        pathArray: action.payload.currentPath.split('/'),
      };
    default:
      return state;
  }
};

export default reducer;
