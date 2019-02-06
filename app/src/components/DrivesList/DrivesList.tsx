import * as React from 'react';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Drive from './Drive/Drive';

import { DriveObject } from 'types/objects';
import './index.scss';

export interface Props {
  drives: DriveObject[];
}

const DrivesInfo = (props: Props) => {
  const { drives } = props;
  console.log(drives);
  return (
    <div className="drives-info">
      <button className="button drive-sort-button">
        <span>Drives</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {drives && drives.map((drive: DriveObject) => (
        <Drive
          key={drive.mount}
          title={drive.mount}
          capacity={drive.capacity}
          size={drive.size}
          free={drive.available}
        />
      ))}
    </div>
  );
};

export default DrivesInfo;
