import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton } from 'react-mdl';
import moment from 'moment';

function GameList({
  launchGame,
  games,
}) {
  const cards = games.map(function(game, index) {
    return (
      <Cell col={4} key={index}>
        <Card shadow={0} style={{width: '500px', height: '300px', margin: 'auto'}}>
          <Link to={`/game/${game.id}`}>
            <CardTitle style={{color: '#fff', height: '250px', background: `url(${cachedUrl(game.cover_small)}) center / cover`}}/>
          </Link>
          <CardText>
            Played for {moment.duration(game.playtime_forever, 'minutes').humanize()}.
          </CardText>
          <CardActions border>
            <Button ripple onClick={() => launchGame(game)}>Play</Button>
          </CardActions>
          <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
          </CardMenu>
        </Card>
      </Cell>
    )});

  return (
    <Grid>
      {cards}
    </Grid>
  );
}

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  launchGame: PropTypes.func.isRequired,
};

export default GameList;
