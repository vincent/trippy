import React, { PropTypes, Component } from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardMenu, CardActions, Button, IconButton, Tooltip } from 'react-mdl';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import AchievementList from './AchievementList'
import moment from 'moment';

var GameView = React.createClass({

  componentWillMount: function() {
    if (! this.props.game.achievements)
      this.props.updateGameDetails(this.props.game);
  },

  render: function() {
    const game = this.props.game;
    return (
      <div>
        <Grid>
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
        </Grid>
        <AchievementList achievements={game.achievements || []}/>
      </div>
    );
  }

});

GameView.propTypes = {
  game: PropTypes.object.isRequired,
  launchGame: PropTypes.func.isRequired,
  updateGameDetails: PropTypes.func.isRequired,
};

export default GameView;
