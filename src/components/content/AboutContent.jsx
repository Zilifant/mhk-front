// About InfoModal Content

const AboutContent = () => (<>
  <div className='line-smd--def'>
    <span className='smd--def'>MHK is an online implementation of the social deduction game </span>
    <span className='smd--emphasize'>Deception: Murder in Hong Kong </span>
    <span className='smd--def'>by designer Tobey Ho. </span>
    <span className='smd--italic'>It is not affiliated with Tobey Ho, Grey Fox Games, or JollyThinkers in any way. </span>
    <span className='smd--def'>Deception: Murder in Hong Kong is © Jolly Thinkers' Learning Centre Limited.</span>
  </div>

  <div className='line-smd--def'>
    <span className='smd--def'>You can purchase the physical version of the game directly from publisher <a href='https://greyfoxgames.com/deception-murder-in-hong-kong/' target="_blank" rel="noopener noreferrer" className='smd--link'>Grey Fox Games</a>.</span>
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

export default AboutContent;