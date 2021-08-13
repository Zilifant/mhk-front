import React from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';
import '../../../../styles/ghost.css'

const Ghost = ({ ghostCards, confirmedClues }) => {
  return (
    <Container className='ghost'>
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
