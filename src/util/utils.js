// Utilities

export const randomName = () => {
  const names = [
    // 'MMMMMMMMMM',
    'nemo','cassandra','olivia','ragnar','brand','hera','violet','dagny','baldur','sigurd','rhialto','corwin','bethany','zane','athena','dane','meladius','darius','gloin','chang','sandor','gerrard','freya','zanzel','madeline','camilla','arronax', 'balthazar', 'calypso', 'agamemnon', 'darwin', 'diedre'
  ];
  const name = names[Math.floor(Math.random()*names.length)];
  return name[0].toUpperCase()+name.slice(1);
};

export const MIN_PLAYER_COUNT = 3,
             MIN_PLAYER_COUNT_FOR_ADV_ROLES = 4,
             MAX_NAME_LEN = 10;

export const GAME_OUTCOMES = {
  redwin: 'The Killer wins! The Hunters used their last accusation.',
  redwin_accomplice: 'The Killer and the Accomplice win! The Hunters used their last accusation.',
  redwintimeout: 'The Killer wins! The Hunters ran out of time.',
  redwintimeout_accomplice: 'The Killer and the Accomplice win! The Hunters ran out of time.',
  redwinwitnessdead: 'The Killer wins! The Witness is dead.',
  redwinwitnessdead_accomplice: 'The Killer and the Accomplice win! The Witness is dead.',
  bluewin: 'The Hunters and the Ghost win!',
  bluewinwitnessalive: 'The Hunters and the Ghost win! The Witness survived.'
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

export function capitalize(str) {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

const text = {
  WAIT_PLAYERS_JOIN: 'Waiting for more players to join. At least 4 players are needed to start. (5 or more players are recommended.)',
  NOTE_MIN_PLAYERS: 'At least 4 players are needed to start.',
  NOTE_REC_PLAYERS: '(5 or more players are recommended.)',
  LOBBY_FULL: 'The lobby is full.',
  WAIT_PLAYERS_READY: 'Waiting for all players to be ready.',
  WAIT_START_GAME(iAmLeader) {
    return `${iAmLeader ? 'All players are ready.' : 'Waiting for the leader to start the game.'}`
  },
  NOTE_CHOOSE_GHOST(iAmLeader) {
    return `${iAmLeader ? 'You' : 'The leader'} may choose a player to be the Ghost or let the role be assigned randomly.`
  },
  NOTE_MIN_ADVROLES: 'At least 5 players are needed to use the Witness and Accomplice roles. (6 or more players are recommended.)',
  NOTE_REC_ADVROLES: 'For the best experience, use both the Witness and the Accomplice, or neither.',
  WARN_WITNESS: 'Warning: Using only the Witness may make the game more difficult for the Killer.',
  WARN_ACCOMPLICE: 'Warning: Using only the Accomplice may make the game more difficult for the Hunters and Ghost.',
  NOTE_ENABLE_ADVROLES(iAmLeader) {
    return `${iAmLeader ? 'You' : 'The leader'} may choose to enable one or both advanced roles.`
  },
};

export const lobbyMethods = {
  text,
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
    return this.numOnline() >= MIN_PLAYER_COUNT_FOR_ADV_ROLES;
  },
  minPlayersOnline() {
    return this.numOnline() >= MIN_PLAYER_COUNT;
  },
  minPlayersReady() {
    return this.numReady() >= MIN_PLAYER_COUNT;
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
         : ['waitingForStart',[iAmLeader]];
  },
  advRolesEnText(iAmLeader) {
    return !this.canUseAdvRoles() ? this.text.NOTE_MIN_ADVROLES
         : this.text.NOTE_ENABLE_ADVROLES(iAmLeader);
  },
};

export const badge = (canAccuse) => canAccuse ? 'can-accuse' : 'accusal-spent';

export const article = (role) => role === 'hunter' ? 'a' : 'the';

export const name = (userId) => userId.slice(0,-5);