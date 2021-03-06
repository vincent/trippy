import React, { PropTypes, Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import GameList from './GameList';
import Header from '../Header';

class Games extends Component {
  static propTypes = {
    updateOwnedGames: PropTypes.func.isRequired,
    setGameListZoom: PropTypes.func.isRequired,
    games: PropTypes.arrayOf(PropTypes.object),
    launchGame: PropTypes.func.isRequired,
    gameListZoom: PropTypes.number,
  }

  componentDidMount() {
    if (! this.props.games.length)
      this.props.updateOwnedGames();
  }

  render() {
    return (
      <div>
        <GameList
          games={this.props.games}
          launchGame={this.props.launchGame}
          gameListZoom={this.props.gameListZoom}
          setGameListZoom={this.props.setGameListZoom}
        />
      </div>
    );
  }
}

export default Games;
