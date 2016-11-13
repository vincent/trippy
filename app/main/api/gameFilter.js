import searchQuery from 'search-query-parser'

const options = {
  keywords: ['name', 'tags'],
  ranges: ['played']
}

export default function gamesFilter(games, query) {

  const simpleNameValidator = new RegExp(query, 'i');

  return games.filter(function (game) {
    return simpleNameValidator.test(game.name);
  })
}

export function gamesFilter2(games, query) {

  const search = searchQuery.parse(query, options);

  if (! query.trim().length) {
    return games;
  }

  return games.filter(gameFilterInclude, queryWithRegexps(search));
}

function queryWithRegexps (query) {
  query.text = query.text ? new RegExp(query.text, 'i') : null;
}

function gameFilterInclude (game, query) {
  if (query.text && query.text(query.text))
    return true;

  if (0 && game.tags.find((t) => (query.tags.indexOf(t) > -1)))
    return true;

  if (query.range) {
    if (query.played && query.played.from >= game.playtime_forever
                     && query.played.to   <= game.playtime_forever) {
      return true;
    }
  }

  return false;
}