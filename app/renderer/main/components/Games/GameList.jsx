import React, { PropTypes, Component, Children } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton, Slider } from 'react-mdl';
import GameCard from './GameCard';
import moment from 'moment';

var GameList = React.createClass({

  getInitialState: function() {
    return {
      zoom: this.props.gameListZoom
    };
  },

  handleZoomChange: function (event) {
    this.setState({
      zoom: parseInt(event.target.value)
    });
  },

  componentWillUnmount: function () {
    this.props.setGameListZoom(this.state.zoom);
  },

  render: function () {
    const self = this;
    const { games, gameListZoom, launchGame } = this.props;
    const cards = games.map(function(game, index) {
      return (
        <GameCard
          key={index}
          game={game}
          gameListZoom={self.state.zoom}
          launchGame={() => self.props.launchGame(game)}
        />
      );
    });
    return (
      <Grid>
        <Cell col={12}>
          <Slider min={12} max={50} value={self.state.zoom} onChange={this.handleZoomChange}/>
        </Cell>
        {cards}
      </Grid>
    );
  }
})

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  gameListZoom: PropTypes.number,
  launchGame: PropTypes.func.isRequired,
  setGameListZoom: PropTypes.func.isRequired,
};

export default GameList;
