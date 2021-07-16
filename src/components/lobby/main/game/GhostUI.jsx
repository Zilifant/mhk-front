import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';

const GhostUI = ({
  game: { keyEvidence, confirmedClues, ghostCards, currentStage }
}) => {
  // console.log('GhostUI');

  return (
    <Container className='self self-ghost' parentGrid='main'>
      <div>{keyEvidence}</div>
      <ul className='hand'>
      {ghostCards.map((card) => (
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