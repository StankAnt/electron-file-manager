import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

import { FileObject } from 'types/objects';

export interface Props {
  files: FileObject[];
}

export default class FilesList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
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
