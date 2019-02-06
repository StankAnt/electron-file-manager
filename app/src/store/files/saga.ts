import * as api from 'api';
import { Event, IpcRenderer, ipcRenderer } from 'electron';
import { END, eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { FileObject } from 'types/objects';
import { setFilesList } from './actions';
import { FilesActionTypes, GetFilesListAction } from './types';

function createGetFilesListChannel(renderer: IpcRenderer) {
  return eventChannel((emit): Unsubscribe => {
    renderer.on('PATH_RESPONSE', (event: Event, files: FileObject[]) => {
      emit(files);
    });
    return () => emit(END);
  });
}

function* onGetFilesListSuccess() {
  const channel: EventChannel<{}> = yield call(createGetFilesListChannel, ipcRenderer);

  while (true) {
    const files: FileObject[] = yield take(channel);
    yield put(setFilesList(files));
  }
}

function* callGetFilesList(action: GetFilesListAction) {
  api.emitGetFilesList(action.payload.path);
  yield call(onGetFilesListSuccess);
}

export const filesSagas = [takeEvery(FilesActionTypes.GET_FILES_LIST, callGetFilesList)];
