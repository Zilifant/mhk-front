import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Player from './Player';

const Players = ({
  stage, players, keyEv, canAccuse, myRole, ghostId
}) => {

  const { userId } = useContext(UserContext);

  return (
    <Container className="players" parentGrid='main'>
      <ul className="player-list">
        {players && players.map(player => {
          if (player.role === 'Ghost') return null;
          if (player.id === userId) return null;
          return (
          <Player
            myRole={myRole}
            stage={stage}
            key={player.id}
            playerId={player.id}
            isGhost={player.id === ghostId}
            accusalSpent={player.accusalSpent}
            hand={player.hand}
            keyEv={keyEv}
            canAccuse={canAccuse}
          />
        )})}
      </ul>
    </Container>
  );
};

export default Players;