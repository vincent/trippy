import React, { PropTypes, Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import GameList from './GameList';

class Games extends Component {
  static propTypes = {
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
    return (
      <Grid>
        <Cell col={12}>
          <GameList
            games={this.props.games}
            launchGame={this.props.launchGame}
            gameListZoom={this.props.gameListZoom}
            setGameListZoom={this.props.setGameListZoom}
          />
        </Cell>
      </Grid>
    );
  }
}

export default Games;
