// Utilities

// Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
// TO DO: move this somewhere else
export function getThisPlayer(userId, game) {
  if (!game) return console.log('Err! No game found in getThisPlayer');
  const thisPlayer = game.players.find(player => player.id === userId);
  if (game.killer.id === userId) thisPlayer.role = `Killer`;
  if (game.ghost.id === userId) thisPlayer.role = `Ghost`;
  if (!game.killer) thisPlayer.role = `Hunter`;
  return thisPlayer;
};