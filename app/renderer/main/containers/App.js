import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import * as JobActions from '../../../shared/actions/job';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';

function mapStateToProps({ job, system, settings }) {
  return { job, system, settings };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...JobActions, ...SystemActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
