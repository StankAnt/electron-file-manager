import { IpcRenderer, ipcRenderer } from 'electron';
import { END, eventChannel, EventChannel, SagaIterator, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { setHomePath } from './actions';
import { PathActionTypes } from './types';

function createGetHomePathChannel(renderer: IpcRenderer) {
  return eventChannel((emit): Unsubscribe => {
    renderer.on('HOME_PATH_RESPONSE', (path: string) => {
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

export default function* (): SagaIterator {
  yield takeEvery(PathActionTypes.GET_HOME_PATH, onGetHomePathSuccess);
}
