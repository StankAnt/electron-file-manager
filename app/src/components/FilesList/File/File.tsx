import * as React from 'react';

import './index.scss';

export interface Props {
  name: string;
  ext: string;
  date: string;
}

const File = (props: Props) => (
  <div className="file-block">
    <span>{props.name}</span>
    <span>{props.ext}</span>
    <span>{props.date}</span>
  </div>
);

export default File;
