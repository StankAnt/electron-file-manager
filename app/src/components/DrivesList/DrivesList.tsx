import * as React from 'react';
import { ActionCreator } from 'redux';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Drive from './Drive/Drive';

import { SetPathAction } from 'store/path/types';
import { DriveObject } from 'types/objects';
import './index.scss';

export interface Props {
  drives: DriveObject[];
  setPath: ActionCreator<SetPathAction>;
}

const DrivesInfo = (props: Props) => {
  const { drives, setPath } = props;

  return (
    <div className="drives-info">
      <button className="button drive-sort-button">
        <span>Drives</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {drives && drives.map((drive: DriveObject) => (
        <Drive
          key={drive.mount}
          mount={drive.mount}
          capacity={drive.capacity}
          size={drive.size}
          free={drive.available}
          setPath={setPath}
        />
      ))}
    </div>
  );
};

export default DrivesInfo;
