// Utilities

export const VERSION = '0.8.5';
export const DEV = process.env.NODE_ENV === 'development';
export const MAX_NAME_LEN = 10;

export const lobbyMethods = {
  getUserBy(val, key='id') {
    const user = this.users.find(u => u[key] === val);
    if (!user) {
      return console.log(`ERR! ${this.id}: no user with '${key}:${val}' found`);
    };
    return user;
  },
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
  canUseAdvRoles() {
    return this.numOnline() >= this.minPlayerAdvRoles;
  },
  minPlayersOnline() {
    return this.numOnline() >= this.minPlayer;
  },
  minPlayersReady() {
    return this.numReady() >= this.minPlayer;
  },
  allPlayersReady() {
    return this.numReady() === this.numOnline();
  },
  canStart() {
    return (this.minPlayersOnline()) && (this.allPlayersReady());
  },
  startGameText(iAmLeader) {
    return !this.minPlayersOnline() ? ['waitingForJoin',[]]
         : !this.allPlayersReady() ? ['waitingForReady',[]]
         : ['waitingForStart',[iAmLeader, this.getUserBy(true, 'isLeader')]];
  },
  getUserColor(userId) {
    return this.users.find(user => user.id === userId).color;
  }
};

export const badge = (canAccuse) => canAccuse ? 'can-accuse' : 'accusal-spent';

export const article = (role) => role === 'hunter' ? 'a' : 'the';

export const name = (userId) => userId.slice(0,-5);

export const capitalize = (str) => {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

// Dynamic, game-specific data added to user object is not provided
// by userContext; this gets that data from the game object
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