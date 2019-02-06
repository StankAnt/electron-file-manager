import { connect } from 'react-redux';
import { ActionCreator, bindActionCreators, Dispatch } from 'redux';

import Home from '../components/Home';

import * as drivesActions from 'store/drives/actions';
import { GetDriveListAction } from 'store/drives/types';
import { ApplicationState } from 'store/index';
import * as pathActions from 'store/path/actions';
import { GetHomePathAction } from 'store/path/types';
import { DriveObject } from 'types/objects';

interface StateToProps {
  currentPath: string;
  drivesList: DriveObject[];
}

interface DispatchToProps {
  getHomePath: ActionCreator<GetHomePathAction>;
  getDrivesList: ActionCreator<GetDriveListAction>;
}

const mapStateToProps = ({ path, drives }: ApplicationState): StateToProps => ({
  currentPath: path.currentPath,
  drivesList: drives.drivesList,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => bindActionCreators({
  getDrivesList: drivesActions.getDrivesList,
  getHomePath: pathActions.getHomePath,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
