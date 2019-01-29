import * as React from 'react';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const PathLine = () => (
  <div className="path-line">
    <div className="navigation">
      <FontAwesomeIcon
        icon={faArrowLeft}
        size="2x"
        className="navigation-arrow"
      />
      <FontAwesomeIcon
        icon={faArrowRight}
        size="2x"
        className="navigation-arrow"
      />
    </div>
  </div>
);

export default PathLine;
