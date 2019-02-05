import { combineReducers, Reducer } from 'redux';
import { all } from 'redux-saga/effects';
import pathReducer from './path/reducer';
import { pathSagas } from './path/saga';
import { PathState } from './path/types';

export interface ApplicationState {
  path: PathState;
}

export function* rootSaga() {
  yield all([
    ...pathSagas,
  ]);
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  path: pathReducer,
});
