import { connect } from 'react-redux';
import { ActionCreator, bindActionCreators, Dispatch } from 'redux';

import Home from '../components/Home';

import { ApplicationState } from 'store/index';
import * as pathActions from 'store/path/actions';
import { GetHomePathAction } from 'store/path/types';

interface StateToProps {
  currentPath: string;
}

interface DispatchToProps {
  getHomePath: ActionCreator<GetHomePathAction>;
}

const mapStateToProps = ({ path }: ApplicationState): StateToProps => ({
  currentPath: path.currentPath,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => bindActionCreators({
  getHomePath: pathActions.getHomePath,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
