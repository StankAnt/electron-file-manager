import * as React from 'react';

import File from './File/File';

import './index.scss';
import { FileObject } from 'types';

export interface Props {
  files: FileObject[];
}

export default class FilesList extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { files } = this.props;
    return (
      <div className="files-list">
        {files && files.map(file => (
          <File name={file.name} ext={file.ext} date={file.date.toUTCString()} />
        ))}
      </div>
    );
  }
}
