import * as api from 'api';
import { Event, ipcRenderer } from 'electron';
import { eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { FileObject } from 'types/objects';
import { setFilesList } from './actions';
import { FilesActionTypes, GetFilesListAction } from './types';

function createGetFilesListChannel() {
  return eventChannel((emit): Unsubscribe => {
    const handler = (event: Event, files: FileObject[]) => {
      emit(files);
    };
    ipcRenderer.on('PATH_RESPONSE', handler);
    return () => ipcRenderer.removeListener('PATH_RESPONSE', handler);
  });
}

function* onGetFilesListSuccess() {
  const channel: EventChannel<{}> = yield call(createGetFilesListChannel);

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
