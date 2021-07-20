// Utilities

// Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
// TO DO: move this somewhere else
export function getThisPlayer(userId, game) {
  if (!game) return undefined;
  return game.players.find(player => player.id === userId);
};