import React, { PropTypes, Component } from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton, Tooltip } from 'react-mdl';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import AchievementList from './AchievementList';
import GameNewsList from './GameNewsList';
import moment from 'moment';

var GameView = React.createClass({

  componentWillMount: function() {
    const { game } = this.props;

    if (! game.achievements)
      this.props.updateGameAchievements(game);

    if (! game.news)
      this.props.updateGameNews(game);

    if (! game.details)
      this.props.updateGameDetails(game);
  },

  render: function() {
    const game = this.props.game;
    return (
      <Grid>
        <Cell col={6}>
          <Card shadow={0} style={{width: '100%', height: '400px', margin: 'auto'}}>
            <CardTitle style={{color: '#fff', height: '300px', background: `url(${cachedUrl(game.cover_small)}) center / cover`}}>
              {game.name}
            </CardTitle>
            <CardText>
              Played for {moment.duration(game.playtime_forever, 'minutes').humanize()}.
            </CardText>
            <CardActions border>
              <Button ripple onClick={() => this.props.launchGame(game)}>Play</Button>
            </CardActions>
          </Card>
          <AchievementList achievements={game.achievements || []}/>
        </Cell>
        <Cell col={6}>
          <GameNewsList news={game.news || []}/>
        </Cell>
      </Grid>
    );
  }

});

GameView.propTypes = {
  game: PropTypes.object.isRequired,
  launchGame: PropTypes.func.isRequired,
  updateGameNews: PropTypes.func.isRequired,
  updateGameDetails: PropTypes.func.isRequired,
  updateGameAchievements: PropTypes.func.isRequired,
};

export default GameView;
