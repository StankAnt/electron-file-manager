import { connect } from 'react-redux';
import { ActionCreator, bindActionCreators, Dispatch } from 'redux';

import Home from '../components/Home';

import * as drivesActions from 'store/drives/actions';
import { GetDrivesListAction } from 'store/drives/types';
import * as filesActions from 'store/files/actions';
import { GetFilesListAction } from 'store/files/types';
import { ApplicationState } from 'store/index';
import * as pathActions from 'store/path/actions';
import { GetHomePathAction, SetPathAction } from 'store/path/types';
import { DriveObject, FileObject } from 'types/objects';

interface StateToProps {
  currentPath: string;
  drivesList: DriveObject[];
  filesList: FileObject[];
}

interface DispatchToProps {
  getHomePath: ActionCreator<GetHomePathAction>;
  getDrivesList: ActionCreator<GetDrivesListAction>;
  getFilesList: ActionCreator<GetFilesListAction>;
  setPath: ActionCreator<SetPathAction>;
}

const mapStateToProps = ({ path, drives, files }: ApplicationState): StateToProps => ({
  currentPath: path.currentPath,
  drivesList: drives.drivesList,
  filesList: files.filesList,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => bindActionCreators({
  getDrivesList: drivesActions.getDrivesList,
  getFilesList: filesActions.getFilesList,
  getHomePath: pathActions.getHomePath,
  setPath: pathActions.setPath,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
