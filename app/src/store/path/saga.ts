import * as api from 'api';
import { Event, ipcRenderer } from 'electron';
import { eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { setPath } from './actions';
import { PathActionTypes } from './types';

function createGetHomePathChannel() {
  return eventChannel((emit): Unsubscribe => {
    const handler = (event: Event, path: string) => {
      emit(path);
    };
    ipcRenderer.on('HOME_PATH_RESPONSE', handler);
    return () => ipcRenderer.removeListener('HOME_PATH_RESPONSE', handler);
  });
}

function* onGetHomePathSuccess() {
  const channel: EventChannel<{}> = yield call(createGetHomePathChannel);

  while (true) {
    const path: string = yield take(channel);
    yield put(setPath(path));
  }
}

function* callGetHomePath() {
  api.emitGetHomePath();
  yield call(onGetHomePathSuccess);
}

export const pathSagas = [takeEvery(PathActionTypes.GET_HOME_PATH, callGetHomePath)];
