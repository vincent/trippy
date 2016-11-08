import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as SettingsActions from '../../../shared/actions/settings';
import * as WallpaperActions from '../../../shared/actions/wallpaper';

function mapStateToProps({ settings, wallpaper }) {
  return { settings, wallpaper };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...SettingsActions, ...WallpaperActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
