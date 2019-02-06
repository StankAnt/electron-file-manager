import React from 'react';
import ReactTable from 'react-table';
import { ActionCreator } from 'redux';

import 'react-table/react-table.css';

import { GetFilesListAction } from 'store/files/types';
import { FileObject } from 'types/objects';

export interface Props {
  files: FileObject[];
  currentPath: string;
  getFilesList: ActionCreator<GetFilesListAction>;
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
      />);
  }
}
