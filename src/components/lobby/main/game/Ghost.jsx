// Ghost //
// Renders Ghost for all players, including additional UI elements for client
// with ghost role.

import Container from '../../../shared/Container';
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
    <div className='ghost-card-wrapper cardback'>
      <div className='gc-cardback'/>
      {isGhostUI && <div className='gc-confirm-btn-placeholder'>-</div>}
    </div>
  )

  return (
    <Container className={isGhostUI ? 'self self-ghost' : 'ghost'}>
      <div className='ghost-cards-wrapper'>
        {cluesDeck.map((card) => (
        <GhostCard
          key={card.id}
          card={card}
          stage={currentStage}
          isMine={isGhostUI}
          confirmedClues={confirmedClues}
        />))}
        {currentStage.type !== 'liminal' && ghostCardBack()}
      </div>
    </Container>
  );
};

export default Ghost;
