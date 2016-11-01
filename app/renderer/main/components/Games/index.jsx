import React, { PropTypes, Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import GameList from './GameList';

class Games extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.object),
    updateGames: PropTypes.func.isRequired,
    launchGame: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateGames();
  }

  render() {
    return (
      <Grid>
        <Cell col={12}>
          <GameList games={this.props.games} launchGame={this.props.launchGame} />
        </Cell>
      </Grid>
    );
  }
}

export default Games;
