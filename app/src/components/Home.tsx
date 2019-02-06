import * as React from 'react';
import { ActionCreator } from 'redux';

import { DriveObject, FileObject } from 'types/objects';
import DrivesList from './DrivesList/DrivesList';
import FilesList from './FilesList/FilesList';
import PathLine from './PathLine/PathLine';

import { GetDrivesListAction } from 'store/drives/types';
import { GetFilesListAction } from 'store/files/types';
import { GetHomePathAction } from 'store/path/types';

export interface Props {
  currentPath: string;
  drivesList: DriveObject[];
  filesList: FileObject[];
  getHomePath: ActionCreator<GetHomePathAction>;
  getDrivesList: ActionCreator<GetDrivesListAction>;
  getFilesList: ActionCreator<GetFilesListAction>;
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
    const { drivesList, filesList, currentPath, getFilesList } = this.props;
    return (
      <div className="app-container">
        <PathLine />
        <div className="data-container">
          <DrivesList drives={drivesList} />
          <FilesList files={filesList} currentPath={currentPath} getFilesList={getFilesList}  />
        </div>
      </div>
    );
  }
}
