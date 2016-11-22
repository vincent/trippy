import React, { PropTypes, Component, Children } from 'react';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { Link } from 'react-router';
import { Table, TableHeader } from 'react-mdl';
import GameLine from './GameLine';
import BackArrow from '../BackArrow';
import moment from 'moment';

function achieved (game) {
  if (!game.achievements) return '̤';
  return game.achievements.filter((a) => (a.owned)).length;
}

const styles = {
  container: {
    height: '656px',
    marginTop: '26px',
    overflowY: 'scroll',
    WebkitAppRegion: 'no-drag',
  },
  table: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    marginTop: '30px',
    overflow: 'hidden',
    width: '100%',
  }
}

class GameList extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.object),
    launchGame: PropTypes.func.isRequired,
    updateGameAchievements: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.games.forEach((game) => {
      if (0 && ! game.achievements)
        this.props.updateGameAchievements(game);
    })
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.games.forEach((game) => {
      if (0 && ! game.achievements)
        this.props.updateGameAchievements(game);
    })
  }

  render() {
    const self = this;
    const { games, launchGame } = this.props;
    return (
      <div style={styles.container}>
        <Table
          sortable
          shadow={0}
          style={styles.table}
          rows={games.map((game, index) => { return {
            name: game.name,
            achievements: achieved(game),
            played: game.playtime_forever,
            mdlRowProps: {
              className: 'game-row',
              style: { backgroundImage: `url(${cachedUrl(game.cover_small)})` }
            }
          }})}>
          <TableHeader name="name" tooltip="Game title">Name</TableHeader>
          <TableHeader numeric name="played" tooltip="Hours played" cellFormatter={(playtime) => moment.duration(playtime, 'minutes').humanize()}>Played</TableHeader>
          <TableHeader numeric name="achievements" tooltip="Achievement percentage">Achieved</TableHeader>
        </Table>
      </div>
    );
  }
}

// <GameLine key={index} game={game} launchGame={() => launchGame(game)}/>

export default GameList;
