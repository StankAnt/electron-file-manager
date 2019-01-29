import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import './index.scss';

export interface Props {
  title: string;
  capacity: number;
  size: number;
  free: number;
}

const Drive = (props: Props) => {
  const { title, capacity, size, free } = props;
  const sizeInGb: number = parseFloat((size / 1024 / 1024 / 1024).toFixed(2));
  const freeInGb: number = parseFloat((free / 1024 / 1024 / 1024).toFixed(2));

  return (
    <button className="button drive-button">
      <div className="drive-title">
        <FontAwesomeIcon icon={faHdd} size="2x" />
        <span className="name">{title}</span>
      </div>
      <div className="capacity-bar">
        <div className="space-used" style={{ width: `${capacity}%` }} />
      </div>
      <div className="space-free">{`${freeInGb} free of ${sizeInGb}`}</div>
    </button>
  );
};

export default Drive;
