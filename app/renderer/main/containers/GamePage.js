import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameView from '../components/Games/GameView';
import * as SystemActions from '../../../shared/actions/system';
import * as GamesActions from '../../../shared/actions/games';

function providers () {
  return Object.keys(GamesActions.providers);
}

function ownedGames (state) {
  return [].concat.apply([], providers().map(pName => state[pName].games));
}

function mapStateToProps(state, ownProps) {
  return {
    game: ownedGames(state).find(function (g) {
      return g.id == ownProps.params.gameId;
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GamesActions, ...SystemActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
