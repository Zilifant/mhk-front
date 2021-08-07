// Utilities

// Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
export function getThisPlayer(userId, game) {
  if (!game) return;

  let thisPlayer;

  if (game.spectators.some(sp => sp.id === userId)) {
    thisPlayer = game.spectators.find(sp => sp.id === userId);
    thisPlayer.role = 'spectator';
    return thisPlayer;
  };

  thisPlayer = game.players.find(player => player.id === userId);
  thisPlayer.role = game.viewingAs;
  return thisPlayer;
};

export function capitalize(str) {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

export const lobbyMethods = {
  numOnline() {
    return this.users.filter(u => u.isOnline === true).length;
  },
  numReady() {
    return this.users.filter(u => u.isReady === true).length;
  },
  usersOnline() {
    return this.users.filter(u => u.isOnline === true);
  },
  usersReady() {
    return this.users.filter(u => u.isReady === true);
  },
  canStart() {
    return (this.numReady() >= 3) && (this.numReady() === this.numOnline());
  }
};

export const badge = (canAccuse) => canAccuse ? 'can-accuse' : 'accusal-spent';

export const article = (role) => role === 'hunter' ? 'a' : 'the';