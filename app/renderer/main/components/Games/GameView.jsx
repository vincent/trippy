import React, { PropTypes, Component } from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton, Tooltip } from 'react-mdl';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import AchievementList from './AchievementList';
import GameNewsList from './GameNewsList';
import GameMoviesCarousel from './GameMoviesCarousel';
import moment from 'moment';
import './gameCard.css';

var GameView = React.createClass({

  componentDidMount: function() {
    const { game } = this.props;

    if (! game.achievements)
      this.props.updateGameAchievements(game);

    if (! game.news)
      this.props.updateGameNews(game);

    if (! game.details)
      this.props.updateGameDetails(game);

    this.useGameWallpaper();
  },

  componentDidUpdate: function (prevProps, prevState) {
    this.useGameWallpaper();
  },

  useGameWallpaper: function (prevProps, prevState) {
    const { game } = this.props;

    if (game.details && game.details.background)
      this.props.setTemporaryWallpaper({
        name: 'custom',
        settings: {
          url: cachedUrl(game.details.background)
        }
      });
  },

  componentWillUnmount: function () {
    this.props.initWallpaper();
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
          {game.achievements && <AchievementList achievements={game.achievements}/>}
        </Cell>
        <Cell col={6}>
          {game.news && <GameNewsList news={game.news}/>}
        </Cell>
      </Grid>
    );
  }

      // {game.details && game.details.movies && <GameMoviesCarousel movies={game.details.movies}/>}

});

GameView.propTypes = {
  game: PropTypes.object.isRequired,
  launchGame: PropTypes.func.isRequired,
  updateGameNews: PropTypes.func.isRequired,
  updateGameDetails: PropTypes.func.isRequired,
  updateGameAchievements: PropTypes.func.isRequired,
};

export default GameView;
