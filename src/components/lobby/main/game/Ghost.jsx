import React from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';

const Ghost = ({ ghost, ghostCards, confirmedClues }) => {
  // console.log('Ghost');
  return (
    <Container className='ghost' parentGrid='main'>
      <ul className='hand'>
        {ghostCards.map((card) => (
        <GhostCard
          key={card.id}
          card={card}
          isMine={false}
          confirmedClues={confirmedClues}
        />))}
      </ul>
    </Container>
  );
};

export default Ghost;
