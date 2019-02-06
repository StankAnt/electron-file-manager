import { Event, ipcRenderer } from 'electron';
import * as React from 'react';
import { ActionCreator } from 'redux';

import { DriveObject, FileObject } from 'types/objects';
import DrivesList from './DrivesList/DrivesList';
import FilesList from './FilesList/FilesList';
import PathLine from './PathLine/PathLine';

import { GetDriveListAction } from 'store/drives/types';
import { GetHomePathAction } from 'store/path/types';

export interface Props {
  currentPath: string;
  drivesList: DriveObject[];
  getHomePath: ActionCreator<GetHomePathAction>;
  getDrivesList: ActionCreator<GetDriveListAction>;
}

export default class Home extends React.PureComponent<Props, {}>  {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    this.props.getHomePath();
    this.props.getDrivesList();
  }

  public render() {
    const { drivesList } = this.props;
    return (
    <div className="app-container">
      <PathLine />
      <div className="data-container">
        <DrivesList drives={drivesList} />
        <FilesList files={[]} />
      </div>
    </div>
  );
    }
}
