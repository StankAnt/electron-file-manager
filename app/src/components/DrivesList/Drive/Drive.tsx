import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { ActionCreator } from 'redux';

import { SetPathAction } from 'store/path/types';
import './index.scss';

export interface Props {
  mount: string;
  capacity: number;
  size: number;
  free: number;
  setPath: ActionCreator<SetPathAction>;
}

const Drive = (props: Props) => {
  const { mount, capacity, size, free, setPath } = props;
  const sizeInGb: number = parseFloat((size / 1024 / 1024 / 1024).toFixed(2));
  const freeInGb: number = parseFloat((free / 1024 / 1024 / 1024).toFixed(2));

  const onClickHandler = () => {
    setPath(mount);
  };

  return (
    <button className="button drive-button" onClick={onClickHandler}>
      <div className="drive-title">
        <FontAwesomeIcon icon={faHdd} size="2x" />
        <span className="name">{mount}</span>
      </div>
      <div className="capacity-bar">
        <div className="space-used" style={{ width: `${capacity}%` }} />
      </div>
      <div className="space-free">{`${freeInGb} free of ${sizeInGb}`}</div>;
    </button>
  );
};

export default Drive;
