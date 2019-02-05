import { Event, ipcRenderer } from 'electron';
import * as React from 'react';
import { ActionCreator } from 'redux';

import { DriveObject, FileObject } from 'types/objects';
import DrivesList from './DrivesList/DrivesList';
import FilesList from './FilesList/FilesList';
import PathLine from './PathLine/PathLine';

import { GetHomePathAction } from 'store/path/types';

export interface Props {
  currentPath: string;
  getHomePath: ActionCreator<GetHomePathAction>;
}

export default (props: Props) => {
  props.getHomePath();

  return (
    < div className="app-container" >
      <PathLine />
      <div className="data-container">
        <DrivesList drives={[]} />
        <FilesList files={[]} />
      </div>
    </div >
  );
};
