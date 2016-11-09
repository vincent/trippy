import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import { ListItem, ListItemContent, List } from 'react-mdl';
import moment from 'moment';

const styles = {
  item: {
    background: '#eee',
    marginBottom: '10px',
  }
}

function GameNewsList({
  news,
}) {
  const items = news.map(function(news, index) {
    const date = moment(news.date, 'X').format('LL');
    return (
      <ListItem threeLine key={index} style={styles.item}>
        <ListItemContent avatar="person" subtitle={`${date}: ${news.contents}`}>
          <a href={news.url}>{news.title}</a>
        </ListItemContent>
      </ListItem>
    )});
  return (
    <List>
      <ListItem>
        <ListItemContent icon="person">News</ListItemContent>
      </ListItem>
      {items}
    </List>
  );
}

GameNewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
};

export default GameNewsList;
