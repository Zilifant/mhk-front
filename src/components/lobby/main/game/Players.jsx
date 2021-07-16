import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Player from './Player';

const Players = ({
  stage, players, viewAsGhost, keyEv, canAccuse
}) => {
  // console.log('Players');

  const { userId } = useContext(UserContext);

  return (
    <Container className="players" parentGrid='main'>
      <ul className="player-list">
        {players && players.map(player => {
          if (player.role === 'Ghost') return null;
          if (player.id === userId) return null;
          return (
          <Player
            stage={stage}
            key={player.id}
            playerId={player.id}
            role={player.role}
            accusalSpent={player.accusalSpent}
            hand={player.hand}
            viewAsGhost={viewAsGhost}
            keyEv={keyEv}
            canAccuse={canAccuse}
          />
        )})}
      </ul>
    </Container>
  );
};

export default Players;