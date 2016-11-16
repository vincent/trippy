import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton } from 'react-mdl';
import TransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

function cardStyle (zoom) {
  return {
    width: `calc(${zoom}% - 16px)`,
    overflow: 'hidden'
  }
}

var GameCard = React.createClass({

  render: function () {
    const { game, gameListZoom } = this.props;
    return (
      <Cell col={4} style={cardStyle(gameListZoom)}>
        <Card shadow={0} style={{ width:'100%', margin: 'auto'}}>
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
    );
  }
})

GameCard.propTypes = {
  gameListZoom: PropTypes.number,
  game: PropTypes.object.isRequired,
  launchGame: PropTypes.func.isRequired,
};

export default GameCard;
