import React, { PropTypes, Component } from 'react';
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
          <CardTitle style={{color: '#fff', height: '176px', background: `url(http://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg) center / cover`}}>
            {game.name}
          </CardTitle>
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
