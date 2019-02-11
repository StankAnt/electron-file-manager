import * as api from 'api';
import { Event, ipcRenderer } from 'electron';
import { END, eventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { FileObject } from 'types/objects';
import { setFilesList } from './actions';
import { FilesActionTypes, GetFilesListAction } from './types';

function createGetFilesListChannel() {
  return eventChannel((emit): Unsubscribe => {
    const handler = (event: Event, files: FileObject[]) => {
      emit(files);
      emit(END);
    };
    ipcRenderer.on('PATH_RESPONSE', handler);
    return () => ipcRenderer.removeListener('PATH_RESPONSE', handler);
  });
}

function createOpenFileListChannel() {
  return eventChannel((emit): Unsubscribe => {
    const handler = (event: Event, res: any) => {
      emit(res);
      emit(END);
    };
    ipcRenderer.on('OPEN_FILE_RESPONSE', handler);
    return () => {
      ipcRenderer.removeAllListeners('OPEN_FILE_RESPONSE');
    };
  });
}

function* onGetFilesListResult() {
  const channel = yield call(createGetFilesListChannel);

  while (true) {
    const files: FileObject[] = yield take(channel);
    yield put(setFilesList(files));
  }
}

function* onOpenFileResult() {
  const channel = yield call(createOpenFileListChannel);

  while (true) {
    const result = yield take(channel);
    // yield put(setFilesList(files));
  }
}

function* callGetFilesList(action: GetFilesListAction) {
  api.emitGetFilesList(action.payload.path);
  yield call(onGetFilesListResult);
}

function* callOpenFile(action: any) {
  api.emitOpenFile(action.payload.path, action.payload.fileName);
  yield call(onOpenFileResult);
}

export const filesSagas = [
  takeEvery(FilesActionTypes.GET_FILES_LIST, callGetFilesList),
  takeEvery(FilesActionTypes.OPEN_FILE, callOpenFile),
];
