// Utilities

// Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
// TO DO: move this somewhere else
export function getThisPlayer(userId, game) {
  if (!game) return console.log('Err! No game found in getThisPlayer');
  const thisPlayer = game.players.find(player => player.id === userId);
  thisPlayer.role = thisPlayerRole(userId, game);
  return thisPlayer;
};

function thisPlayerRole(userId, game) {
  if (game.killer && game.killer.id === userId) return `Killer`;
  if (game.ghost.id === userId) return `Ghost`;
  return `Hunter`;
};