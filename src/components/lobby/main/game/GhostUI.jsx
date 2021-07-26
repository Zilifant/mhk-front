import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';

const GhostUI = ({
  game: { confirmedClues, cluesDeck, currentStage }
}) => {

  return (
    <Container className='self self-ghost' parentGrid='main'>
      <ul className='hand'>
      {cluesDeck.map((card) => (
      <GhostCard
        key={card.id}
        card={card}
        currentStage={currentStage}
        isMine={true}
        confirmedClues={confirmedClues}
      />))}
      </ul>
    </Container>
  );
};

export default GhostUI;