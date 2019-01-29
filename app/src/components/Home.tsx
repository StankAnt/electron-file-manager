import { Event, ipcRenderer } from 'electron';
import * as React from 'react';

import { DriveObject, FileObject } from 'types';
import DrivesList from './DrivesList/DrivesList';
import FilesList from './FilesList/FilesList';
import PathLine from './PathLine/PathLine';

export interface State {
  drives: DriveObject[];
  files: FileObject[];
}

export default class Home extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      drives: [],
      files: [],
    };
  }
  public componentDidMount() {
    ipcRenderer.on('DRIVE_INFO_RESPONSE', (event: Event, drives: DriveObject[]) => {
      this.setState({ drives });
    });
    ipcRenderer.send('DRIVE_INFO_REQUEST');
  }

  public render() {
    const { drives, files } = this.state;
    return (
      <div className="app-container">
        <PathLine />
        <div className="data-container">
          <DrivesList drives={drives} />
          <FilesList files={files} />
        </div>
      </div>
    );
  }
}
