import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

var GameLine = React.createClass({

  render: function () {
    const { game } = this.props;
    return (
      <div className="gameLine" onDoubleClick={() => self.props.launchGame(game)}>
        <Link to={`/game/${game.id}`}>⤷</Link>
        <span className="gameTitle">{game.name}</span>
      </div>
    );
  }
})

GameLine.propTypes = {
  game: PropTypes.object.isRequired,
  launchGame: PropTypes.func.isRequired,
};

export default GameLine;
