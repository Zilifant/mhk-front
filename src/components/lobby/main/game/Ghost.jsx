import React from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';
import { GiDeathSkull } from 'react-icons/gi';
import '../../../../styles/ghost.css';

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
      <div className='gc-back'>
        <div>
          <GiDeathSkull className='gc-back-icon' />
          <div className='gc-back-text'>MHK</div>
        </div>
      </div>
      {isGhostUI &&
      <div className='gc-conbtn-placeholder'>
        invisibletext
      </div>}
    </div>
  )

  return (
    <Container className={isGhostUI ? 'self' : 'ghost'}>
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
