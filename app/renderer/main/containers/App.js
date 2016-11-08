import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import * as JobActions from '../../../shared/actions/job';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';
import * as WallpaperActions from '../../../shared/actions/wallpaper';

function mapStateToProps({ job, system, settings, wallpaper }) {
  return { job, system, settings, wallpaper };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...JobActions, ...SystemActions, ...WallpaperActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
