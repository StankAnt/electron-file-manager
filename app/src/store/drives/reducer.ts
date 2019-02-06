import { Reducer } from 'redux';
import { DrivesActions, DrivesActionTypes, DrivesState } from './types';

const initialState: DrivesState = {
  drivesList: [],
};

const reducer: Reducer<DrivesState, DrivesActions> = (state: DrivesState = initialState, action: DrivesActions) => {
  switch (action.type) {
    case DrivesActionTypes.SET_DRIVES_LIST:
      return {
        ...state,
        drivesList: action.payload.drivesList,
      };
    default:
      return state;
  }
};

export default reducer;
