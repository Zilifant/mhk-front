// Utilities

// Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
// TO DO: move this somewhere else
export function getThisPlayer(userId, game) {
  if (!game) return;
  const thisPlayer = game.players.find(player => player.id === userId);
  thisPlayer.role = thisPlayerRole(userId, game);
  return thisPlayer;
};

function thisPlayerRole(userId, game) {
  if (game.viewingAs) return game.viewingAs;
  if (game.killer && game.killer.id === userId) return 'killer';
  if (game.witness && game.witness.id === userId) return 'witness';
  if (game.accomplice && game.accomplice.id === userId) return 'accomplice';
  if (game.ghost.id === userId) return 'ghost';
  return 'hunter';
};

// console.log('Err! No game found in getThisPlayer');