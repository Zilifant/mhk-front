// Ghost //
// Renders Ghost for all players, including additional UI elements for client
// with ghost role.

import Container from '../../../shared/Container';
import SVGIcon from '../../../shared/SVGIcon';
import GhostCard from './GhostCard';
import '../../../../styles/ghost.scss';

const Ghost = ({
  isGhostUI,
  game: {
    confirmedClues,
    cluesDeck,
    currentStage
  }
}) => {

  const ghostCardBack = () => (
    <div className='card-wrap--ghost back'>
      <div className='gc-back'/>
      {isGhostUI && <div className='gc-conbtn-placeholder'>-</div>}
    </div>
  )

  return (
    <Container className={isGhostUI ? 'self gh' : 'ghost'}>
      <ul className='c-group'>
        {cluesDeck.map((card) => (
        <GhostCard
          key={card.id}
          card={card}
          stage={currentStage}
          isMine={isGhostUI}
          confirmedClues={confirmedClues}
        />))}
        {currentStage.type !== 'liminal' && ghostCardBack()}
      </ul>
    </Container>
  );
};

export default Ghost;
