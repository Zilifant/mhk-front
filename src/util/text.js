// Text

export const rulesMultiPage = [
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

export const rulesTemp = () => (<>
  <div className='line-smd--def'><span className='smd--warn'>Rulebook coming soon...</span></div>
  <div className='line-smd--def'><span className='smd--def'>In the meantime, check out this walkthrough at <a href='https://gamerules.com/rules/deception-murder-in-hong-kong/' target="_blank" rel="noopener noreferrer" className='smd--link'>GameRules.com</a></span></div>
  <div className='line-smd--def'><span className='smd--def'>Note: in this app some roles have different names from those in the tabletop version.</span></div>
  <div className='line-smd--listitem'><span className='smd--def'>Forensice Scientist: </span><span className='smd--keyword ghost'>Ghost</span></div>
  <div className='line-smd--listitem'><span className='smd--def'>Investigator: </span><span className='smd--keyword hunter'>Hunter</span></div>
  <div className='line-smd--listitem'><span className='smd--def'>Murderer: </span><span className='smd--keyword killer'>Killer</span></div>
</>);

export const aboutTemp = () => (<>
    <div className='line-smd--def'>
      <span className='smd--def'>MHK is an online implementation of the social deduction game </span>
      <span className='smd--emphasize'>Deception: Murder in Hong Kong </span>
      <span className='smd--def'>by designer Tobey Ho. </span>
      <span className='smd--italic'>It is not affiliated with Tobey Ho, Grey Fox Games, or JollyThinkers in any way. </span>
      <span className='smd--def'>Deception: Murder in Hong Kong is © Jolly Thinkers' Learning Centre Limited.</span>
    </div>

    <div className='line-smd--def'>
      <span className='smd--def'>Buy the physical version of the game directly from publisher <a href='https://greyfoxgames.com/deception-murder-in-hong-kong/' target="_blank" rel="noopener noreferrer" className='smd--link'>Grey Fox Games</a>.</span>
    </div>

    <div className='line-smd--def'>
      <span className='smd--def'>Learn more about the game on <a href='https://boardgamegeek.com/boardgame/156129/deception-murder-hong-kong' target="_blank" rel="noopener noreferrer" className='smd--link'>BoardGameGeek</a>.</span>
    </div>

    <div className='line-smd--def'>
      <span className='smd--def'>MHK is still in beta. You may find a bug here or there.</span>
    </div>

    <h2 className='smd--heading'><span>Planned Features and Improvements</span></h2>
    <ul>
      <li className='line-smd--listitem'><span className='smd--def'>Interface scaling for high-resolution displays</span></li>
      <li className='line-smd--listitem'><span className='smd--def'>Responsive interface for mobile and tablets</span></li>
      <li className='line-smd--listitem'><span className='smd--def'>Smoother interface transitions (animations)</span></li>
      <li className='line-smd--listitem'><span className='smd--def'>Dyslexic font option</span></li>
      <li className='line-smd--listitem'><span className='smd--def'>Integrated rulebook</span></li>
      <li className='line-smd--listitem'><span className='smd--def'>Unique icons for Evidence and Means cards</span></li>
    </ul>

    <h2 className='smd--heading'><span>Contact</span></h2>
    <div className='line-smd--def'>
      <span className='smd--def'>Find a bug? Have some feedback? Contact me at <a className='smd--link' href='mailto:zilifant.code@gmail.com'>zilifant.code@gmail.com</a>.</span>
    </div>
</>);

export const about = {
  id: 'about',
  title: 'about the app',
  content: 'This app was built for personal use and demonstration purposes.<_e_Planned Features and Improvements<>li>Interface scaling for high-resolution displays<>li>Responsive interface for mobile and tablets<>li>Smoother interface (animated transitions)<>li>Dyslexic font option<>li>Light/dark mode<>li>Integrated rulebook<>li>Unique icons for all Evidence and Means cards'
}

export const aboutMultiPage = [
  {
    id: 'intro',
    title: 'about the app',
    content: 'for personal use, demonstration purposes, etc.'
  },
  {
    id: 'deception',
    title: 'Deception: Murder in Hong Kong',
    content: 'about the original game.'
  },
  {
    id: 'beta',
    title: 'Work in Progress',
    content: 'it\'s a work in progress.'
  },
  {
    id: 'contact',
    title: 'Contact',
    content: 'about me.'
  },
  // {
  //   id: '',
  //   title: '',
  //   content: ''
  // }
];