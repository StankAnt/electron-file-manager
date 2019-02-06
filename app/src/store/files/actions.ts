import { ActionCreator } from 'redux';
import { FileObject } from 'types/objects';
import { FilesActionTypes, GetFilesListAction, SetFilesListAction } from './types';

export const getFilesList: ActionCreator<GetFilesListAction> = (path: string) => {
  return {
    payload: {
      path,
    },
    type: FilesActionTypes.GET_FILES_LIST,
  };
};

export const setFilesList: ActionCreator<SetFilesListAction> = (files: FileObject[]) => ({
  payload: {
    filesList: files,
  },
  type: FilesActionTypes.SET_FILES_LIST,
});
