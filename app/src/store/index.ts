import { combineReducers, Reducer } from 'redux';
import { fork } from 'redux-saga/effects';
import pathReducer from './path/reducer';
import pathSaga from './path/saga';
import { PathState } from './path/types';

export interface ApplicationState {
  path: PathState;
}

export function* rootSaga() {
  yield [
    fork(pathSaga),
  ];
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  path: pathReducer,
});
