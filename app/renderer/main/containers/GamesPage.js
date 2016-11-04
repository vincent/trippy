import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Games from '../components/Games';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';
import gamesFilter from '../../../main/api/gameFilter';

function mapStateToProps(state) {
  const ownedGames = [].concat(state.steam.games);
  return {
    games: gamesFilter(ownedGames, state.games.gamesFilter)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...SystemActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
