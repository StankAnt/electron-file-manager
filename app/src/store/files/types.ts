import { Action } from 'redux';
import { FileObject } from 'types/objects';

export enum FilesActionTypes {
  GET_FILES_LIST = '@@files/GET_FILES_LIST',
  SET_FILES_LIST = '@@files/SET_FILES_LIST',
  SET_FILES_LIST_ERROR = '@@files/SET_FILES_LIST_ERROR',
  OPEN_FILE = '@@files/OPEN_FILE',
  OPEN_FILE_ERROR = '@@files/OPEN_FILE_ERROR',
}

export interface FilesState {
  filesList: FileObject[];
}

export interface GetFilesListAction extends Action {
  type: FilesActionTypes.GET_FILES_LIST;
  payload: {
    path: string;
  };
}

export interface SetFilesListAction extends Action {
  type: FilesActionTypes.SET_FILES_LIST;
  payload: {
    filesList: FileObject[],
  };
}

export interface SetFilesListErrorAction extends Action {
  type: FilesActionTypes.SET_FILES_LIST_ERROR;
  payload: {
    errorMessage: string,
  };
}

export interface OpenFileAction extends Action {
  type: FilesActionTypes.OPEN_FILE;
  payload: {
    path: string;
    fileName: string;
  };
}

export type FilesActions =
  GetFilesListAction |
  SetFilesListAction |
  OpenFileAction;
