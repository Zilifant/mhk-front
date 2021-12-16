// Utilities //
// Provides general utility functions and constants.
// TO DO: Break many of these out into their own modules.

export const VERSION = '0.8.8';
export const isDevEnv = process.env.NODE_ENV === 'development';
export const MAX_NAME_LEN = 10; // Maximum username length.

// Methods mixin.
export const lobbyMethods = {
  getUserBy(val, key='id') {
    const user = this.users.find(u => u[key] === val);
    if (!user && isDevEnv) {
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

// Capitalize first letter of each word in a string.
export const capitalize = (str) => {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

// Return correct css class for badge icon.
export const badge = (canAccuse) => canAccuse ? 'can-accuse' : 'accusal-spent';

// Return correct article for player UI.
export const article = (role) => role === 'hunter' ? 'a' : 'the';

// Remove unique numbers from userId to display only username in UI.
export const name = (userId) => userId.slice(0,-5);

// Converts a UTC time string into the client's timezone.
// Expects a local time string in `en-GB` format, e.g.: '07:42:31'.
export function convertToClientTimezone(time) {

  const offsetHours = new Date().getTimezoneOffset()/60;
  const UTCHour = parseInt(time.slice(0,2)); // Also removes leading zero.

  let hour = UTCHour + offsetHours;
  if (hour > 12) hour = hour - 12;
  if (hour <  1) hour = hour + 12;

  // Absolute UI accuracy is not needed for this use. We convert to 12-hour
  // format, but for brevity don't append AM/PM.
  return hour.toString() + time.slice(2,8);
};

// Get data of the player who's client this is.
// Game-specific data (most importantly, a player's role) is not stored on the
// user object. This gets that data from the game object once the game has
// started.
// A unique version of the game object (with hidden player role data redacted)
// is sent to each user's client based on their role. The game's `viewingAs`
// property indicates the user's role.
export function getThisPlayer(userId, game) {
  if (!game) return; // If there is no game, do nothing.

  let thisPlayer;

  // If this user is a spectator, return that data.
  if (game.spectators.some(sp => sp.id === userId)) {
    thisPlayer = game.spectators.find(sp => sp.id === userId);
    thisPlayer.role = 'spectator';
    return thisPlayer;
  };

  thisPlayer = game.players.find(player => player.id === userId);
  thisPlayer.role = game.viewingAs;
  return thisPlayer;
};
