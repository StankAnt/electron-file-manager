import * as api from 'api';
import { Event, IpcRenderer, ipcRenderer } from 'electron';
import { END, eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { DriveObject } from 'types/objects';
import { setDriveList } from './actions';
import { DrivesActionTypes } from './types';

function createGetDriveListChannel(renderer: IpcRenderer) {
  return eventChannel((emit): Unsubscribe => {
    renderer.on('DRIVE_INFO_RESPONSE', (event: Event, drives: DriveObject[]) => {
      emit(drives);
    });
    return () => emit(END);
  });
}

function* onGetDriveListSuccess() {
  const channel: EventChannel<{}> = yield call(createGetDriveListChannel, ipcRenderer);

  while (true) {
    const drives: DriveObject[] = yield take(channel);
    yield put(setDriveList(drives));
  }
}

function* callGetDriveList() {
  api.emitGetDriveList();
  yield call(onGetDriveListSuccess);
}

export const drivesSagas = [takeEvery(DrivesActionTypes.GET_DRIVES_LIST, callGetDriveList)];
