import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Games from '../components/Games';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';
import gamesFilter from '../../../main/api/gameFilter';

function providers () {
  return Object.keys(GamesActions.providers);
}

function ownedGames (state) {
  return [].concat.apply([], providers().map(pName => state[pName].games));
}

function mapStateToProps(state) {
  return {
    games: gamesFilter(ownedGames(state), state.games.gamesFilter)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...SystemActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
