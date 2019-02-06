import * as api from 'api';
import { Event, IpcRenderer, ipcRenderer } from 'electron';
import { END, eventChannel, EventChannel, Unsubscribe } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { DriveObject } from 'types/objects';
import { setDrivesList } from './actions';
import { DrivesActionTypes } from './types';

function createGetDrivesListChannel(renderer: IpcRenderer) {
  return eventChannel((emit): Unsubscribe => {
    renderer.on('DRIVE_INFO_RESPONSE', (event: Event, drives: DriveObject[]) => {
      emit(drives);
    });
    return () => emit(END);
  });
}

function* onGetDrivesListSuccess() {
  const channel: EventChannel<{}> = yield call(createGetDrivesListChannel, ipcRenderer);

  while (true) {
    const drives: DriveObject[] = yield take(channel);
    yield put(setDrivesList(drives));
  }
}

function* callGetDrivesList() {
  api.emitGetDrivesList();
  yield call(onGetDrivesListSuccess);
}

export const drivesSagas = [takeEvery(DrivesActionTypes.GET_DRIVES_LIST, callGetDrivesList)];
