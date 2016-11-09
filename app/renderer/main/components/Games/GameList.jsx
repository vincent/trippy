import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton, Slider } from 'react-mdl';
import moment from 'moment';

function cardStyle (zoom) {
  return {
    width: `calc(${zoom}% - 16px)`,
    overflow: 'hidden'
  }
}

var GameList = React.createClass({

  handleZoomChange: function (event) {
    this.props.setGameListZoom(event.target.value);
  },

  render: function () {
    const self = this;
    const cards = this.props.games.map(function(game, index) {
      return (
        <Cell col={4} key={index} style={cardStyle(self.props.gameListZoom)}>
          <Card shadow={0} style={{width: '500px', height: '350px', margin: 'auto'}}>
            <Link to={`/game/${game.id}`}>
              <CardTitle expand style={{color: '#fff', height: '250px', background: `url(${cachedUrl(game.cover_small)}) center / cover`}}/>
            </Link>
            <CardText>
              Played for {moment.duration(game.playtime_forever, 'minutes').humanize()}.
            </CardText>
            <CardActions border>
              <Button ripple onClick={() => self.props.launchGame(game)}>Play</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share" />
            </CardMenu>
          </Card>
        </Cell>
      )});

    return (
      <Grid>
        <Cell col={12}>
          <Slider min={10} max={50} defaultValue={33.33333} value={this.props.gameListZoom} onChange={this.handleZoomChange}/>
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
