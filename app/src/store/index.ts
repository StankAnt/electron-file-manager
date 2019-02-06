import { combineReducers, Reducer } from 'redux';
import { all } from 'redux-saga/effects';

import drivesReducer from './drives/reducer';
import { drivesSagas } from './drives/saga';
import { DrivesState } from './drives/types';

import filesReducer from './files/reducer';
import { filesSagas } from './files/saga';
import { FilesState } from './files/types';

import pathReducer from './path/reducer';
import { pathSagas } from './path/saga';
import { PathState } from './path/types';

export interface ApplicationState {
  drives: DrivesState;
  files: FilesState;
  path: PathState;
}

export function* rootSaga() {
  yield all([
    ...drivesSagas,
    ...filesSagas,
    ...pathSagas,
  ]);
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  drives: drivesReducer,
  files: filesReducer,
  path: pathReducer,
});
