import { Reducer } from 'redux';
import { FilesActions, FilesActionTypes, FilesState } from './types';

const initialState: FilesState = {
  filesList: [],
};

const reducer: Reducer<FilesState, FilesActions> = (state: FilesState = initialState, action: FilesActions) => {
  switch (action.type) {
    case FilesActionTypes.SET_FILES_LIST:
      return {
        ...state,
        filesList: action.payload.filesList,
      };
    default:
      return state;
  }
};

export default reducer;
