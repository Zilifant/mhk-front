import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
// import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';
import '../../../../styles/ghost.css'

const GhostUI = ({
  game: {
    confirmedClues,
    cluesDeck,
    currentStage
  }
}) => {

  return (
    <Container className='self self-ghost' parentGrid='main'>
      <ul className='c-group'>
      {cluesDeck.map((card) => (
        <GhostCard
          key={card.id}
          card={card}
          stage={currentStage}
          isMine={true}
          confirmedClues={confirmedClues}
        />))}
      </ul>
    </Container>
  );
};

export default GhostUI;