// Utilities

export const MIN_PLAYER_COUNT = 3;
export const MIN_PLAYER_COUNT_FOR_ADV_ROLES = 4;
export const MAX_NAME_LEN = 10;

export const rules = [
  {
    id: 'intro',
    title: 'introduction',
    'content': 'In the neon-bathed city of Hong Kong, a grisly murder has taken place. You and your fellow Investigators arrive at the scene of the crime to discover that the culprit has left important clues. From among the suspicious objects scattered around, you must deduce the "Means of Murder" and identify the "Key Evidence" in order to catch and convict the killer.<As if solving a murder wasn\'t tricky enough, this one is complicated by the fact that the killer is among the Investigators! While the Forensic Scientist gives Investigators clues on what to look for, the Murderer attempts to sow confusion and doubt in order to cover their dark deed.<Will the Investigators be perceptive enough to successfully solve the crime or will the culprit(s) accomplish the perfect crime and get away with murder?'
  },
  {
    id: 'roles',
    title: 'roles',
    content: 'Forensic Scientist x1<As the game master, the Forensic Scientist holds the solution to the crime. They are responsible for assisting the Investigators in identifying the "Key Evidence" and "Means of Murder".<When an Investigator does that successfully, the crime is solved and the Forensic Scientist and the Investigators win the game.<During the game, the Forensic Scientist is NOT allowed to hint to the solution with words, gestures, or eyes.<Murderer x1<When the crime takes place, the Murderer chooses 1 Clue card and 1 Means card as the solution to the crime. These will be the "Key Evidence" and "Means of Murder" respectively.<The Murderer tries to hide their role and look for a scapegoat. Even if they are identified, the Murderer still wins the game if no one correctly identifies both the "Key Evidence" and the "Means of Murder".<Investigators x8<To solve the crime, the Investigators must analyze the hints given by the Forensic Scientist.<As long as one of the Investigators correctly identifies both the "Key Evidence" and "Means of Murder", the Murderer is arrested and the Investigators win the game as does the Forensic Scientist.<Bear in mind that the Murderer (and sometimes Accomplice) is among the Investigators! The innocent Investigators must make a vigorous effort to defend themselves from false accusation.<Accomplice x1<The Accomplice is an optional role for games with 6 or more players.<He or she knows who the Murderer is, as well as the solution to the crime.<The Accomplice and Murderer both win if the Murderer gets away with the crime.<Witness x1<The Witness is an optional role when playing with the Accomplice. The Witness is an Investigator who has witnessed the culprits leaving the crime scene.<They have no way of knowing which is the Murderer and which is the Accomplice and they do not know how the crime was committed.<If the Murderer is arrested but can identify the Witness, the Witness is considered to be killed, allowing the Murderer and the Accomplice to get away with murder and win the game.'
  },
  {
    id: 'setup',
    title: 'setup',
    content: 'Return to the game box all Event tiles, which are used as a variant. Deal 4 Clue cards and 4 Means cards to each player. The players display their own 8 cards face up in front of themselves, with the texts and graphics facing the other players so they can all be seen. Players should take a moment to glance through all the Clue and Means cards on the table.<The graphics on the Clue and Means Cards are for reference only. Players should use their imagination based on the texts.'
  },
  {
    id: 'investigation',
    title: 'investigation',
    content: 'This is the main part of the game and is divided into 3 rounds - each round consists of an Evidence Collection phase and a Presentation phase. The game may end prematurely when any one of the Investigators correctly identifies the "Key Evidence" and "Means of Murder".'
  },
  {
    id: 'solving',
    title: 'solving the crime',
    content: 'Other than the Forensic Scientist, every player, including the Murderer (and the Accomplice) can make one single attempt to "Solve the Crime" at any time during the game. To try to solve the crime, a player should announce, "Let me Solve the Crime!" That player then points to one Clue card and one Means card in front of another player.<If the cards chosen when a player attempts to solve the crime are the correct "Key Evidence" and "Means of Murder", the game ends immediately and the Forensic Scientist and Investigators (as well as the Witness) win.<If either of the cards is incorrect, the Forensic Scientist will only say "No" without giving any additional information.<If a player has attempted to solve the crime incorrectly, they must surrender their Badge token to the Forensic Scientist, indicating that they have used their one attempt to solve the crime.<They continue to participate as normal and may still present during all Presentation phases but may not make another attempt to solve the crime.'
  },
];

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

export const randomName = () => {
  const names = [
    // 'MMMMMMMMMM',
    'nemo','cassandra','olivia','ragnar','brand','hera','violet','dagny','baldur','sigurd','rhialto','corwin','bethany','zane','athena','dane','meladius','darius','gloin','chang','sandor','gerrard','freya','zanzel','madeline','camilla','arronax', 'balthazar', 'calypso', 'agamemnon', 'darwin', 'diedre'
  ];
  const name = names[Math.floor(Math.random()*names.length)];
  return name[0].toUpperCase()+name.slice(1);
};

// const text = {
//   WAIT_PLAYERS_JOIN: 'Waiting for more players to join. At least 4 players are needed to start. (5 or more players are recommended.)',
//   NOTE_MIN_PLAYERS: 'At least 4 players are needed to start.',
//   NOTE_REC_PLAYERS: '(5 or more players are recommended.)',
//   LOBBY_FULL: 'The lobby is full.',
//   WAIT_PLAYERS_READY: 'Waiting for all players to be ready.',
//   WAIT_START_GAME(iAmLeader) {
//     return `${iAmLeader ? 'All players are ready.' : 'Waiting for the leader to start the game.'}`
//   },
//   NOTE_CHOOSE_GHOST(iAmLeader) {
//     return `${iAmLeader ? 'You' : 'The leader'} may choose a player to be the Ghost or let the role be assigned randomly.`
//   },
//   NOTE_MIN_ADVROLES: 'At least 5 players are needed to use the Witness and Accomplice roles. (6 or more players are recommended.)',
//   NOTE_REC_ADVROLES: 'For the best experience, use both the Witness and the Accomplice, or neither.',
//   WARN_WITNESS: 'Warning: Using only the Witness may make the game more difficult for the Killer.',
//   WARN_ACCOMPLICE: 'Warning: Using only the Accomplice may make the game more difficult for the Hunters and Ghost.',
//   NOTE_ENABLE_ADVROLES(iAmLeader) {
//     return `${iAmLeader ? 'You' : 'The leader'} may choose to enable one or both advanced roles.`
//   },
// };