export default function gamesFilter(games, query) {

  const simpleNameValidator = new RegExp(query, 'i');

  return games.filter(function (game) {
    return simpleNameValidator.test(game.name);
  })
}