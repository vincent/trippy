import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Steam from '../components/Steam';
import * as SteamActions from '../../../shared/actions/steam';

function mapStateToProps({ steam }) {
  return { steam };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SteamActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Steam);
