import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameView from '../components/Games/GameView';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';
import * as WallpaperActions from '../../../shared/actions/wallpaper';

function mapStateToProps(state, ownProps) {
  return {
    game: state.games.ownedGames.find(function (g) {
      return g.id == ownProps.params.gameId;
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...SystemActions, ...WallpaperActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
