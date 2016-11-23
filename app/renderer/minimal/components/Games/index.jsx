import React, { PropTypes, Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import GameList from './GameList';
import Header from '../Header';
import GameSearchInput from '../GameSearchInput';

class Games extends Component {
  static propTypes = {
    updateGameAchievements: PropTypes.func.isRequired,
    updateOwnedGames: PropTypes.func.isRequired,
    setGameListZoom: PropTypes.func.isRequired,
    games: PropTypes.arrayOf(PropTypes.object),
    launchGame: PropTypes.func.isRequired,
    gameListZoom: PropTypes.number,
  }

  componentDidMount() {
    this.props.updateOwnedGames();
  }

  render() {
    const style = {
      WebkitAppRegion:'no-drag'
    };
    return (
      <div>
        <GameSearchInput style={style} updateGamesFilter={this.props.updateGamesFilter}/>
        <GameList
          games={this.props.games}
          launchGame={this.props.launchGame}
          gameListZoom={this.props.gameListZoom}
          setGameListZoom={this.props.setGameListZoom}
          updateGameAchievements={this.props.updateGameAchievements}
        />
      </div>
    );
  }
}

export default Games;
