import * as api from 'api';
import { Event, ipcRenderer } from 'electron';
import { END, eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { DriveObject } from 'types/objects';
import { setDrivesList } from './actions';
import { DrivesActionTypes } from './types';

function createGetDrivesListChannel() {
  return eventChannel((emit) => {
    const handler = (event: Event, drives: DriveObject[]) => {
      emit(drives);
      emit(END);
    };
    ipcRenderer.on('DRIVE_INFO_RESPONSE', handler);
    return () => ipcRenderer.removeListener('DRIVE_INFO_RESPONSE', handler);
  });
}

function* onGetDrivesListSuccess() {
  const channel = yield call(createGetDrivesListChannel);

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
