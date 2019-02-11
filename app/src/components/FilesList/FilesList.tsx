import path from 'path';
import React from 'react';
import ReactTable, { FinalState, RowInfo } from 'react-table';
import { ActionCreator } from 'redux';

import 'react-table/react-table.css';

import { GetFilesListAction, OpenFileAction } from 'store/files/types';
import { SetPathAction } from 'store/path/types';
import { FileObject } from 'types/objects';

export interface Props {
  files: FileObject[];
  currentPath: string;
  getFilesList: ActionCreator<GetFilesListAction>;
  setPath: ActionCreator<SetPathAction>;
  openFile: ActionCreator<OpenFileAction>;
}

export default class FilesList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentPath !== prevProps.currentPath) {
      this.props.getFilesList(this.props.currentPath);
    }
  }

  public doubleClickHandler = (state: any, rowInfo: any) => ({
    onDoubleClick: () => {
      const { currentPath, setPath, openFile } = this.props;
      const fileInfo = rowInfo.original;
      if (!fileInfo.isFile) {
        setPath(path.join(currentPath, fileInfo.title));
      } else {
        openFile(currentPath, fileInfo.title);
      }
    },
  })

  public render() {
    const { files } = this.props;
    return (
      <ReactTable
        data={files}
        columns={[
          {
            Header: 'Name',
            accessor: 'title',
          },
          {
            Header: 'Size',
            accessor: d => d.isFile ? d.size : '',
            id: 'sizeColumn',
            resizable: false,
            width: 150,
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
        ]}
        className="-striped -highlight file-list"
        showPageSizeOptions={false}
        getTrProps={this.doubleClickHandler}
      />);
  }
}
