import { combineReducers, Reducer } from 'redux';
import { all } from 'redux-saga/effects';

import drivesReducer from './drives/reducer';
import { drivesSagas } from './drives/saga';
import { DrivesState } from './drives/types';
import pathReducer from './path/reducer';
import { pathSagas } from './path/saga';
import { PathState } from './path/types';

export interface ApplicationState {
  drives: DrivesState;
  path: PathState;
}

export function* rootSaga() {
  yield all([
    ...drivesSagas,
    ...pathSagas,
  ]);
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  drives: drivesReducer,
  path: pathReducer,
});
