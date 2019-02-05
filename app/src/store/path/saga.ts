import * as api from 'api';
import { Event, IpcRenderer, ipcRenderer } from 'electron';
import { END, eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { setHomePath } from './actions';
import { PathActionTypes } from './types';

function createGetHomePathChannel(renderer: IpcRenderer) {
  return eventChannel((emit): Unsubscribe => {
    renderer.on('HOME_PATH_RESPONSE', (event: Event, path: string) => {
      emit(path);
    });
    return () => emit(END);
  });
}

function* onGetHomePathSuccess() {
  const channel: EventChannel<{}> = yield call(createGetHomePathChannel, ipcRenderer);

  while (true) {
    const path: string = yield take(channel);
    yield put(setHomePath(path));
  }
}

function* callGetHomePath() {
  api.emitGetHomePath();
  yield call(onGetHomePathSuccess);
}

export const pathSagas = [takeEvery(PathActionTypes.GET_HOME_PATH, callGetHomePath)];
