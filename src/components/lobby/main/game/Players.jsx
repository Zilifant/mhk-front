import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Player from './Player';

const Players = ({
  stage, players, keyEv, canAccuse, myRole, ghostId, redTeam
}) => {

  console.log(myRole);
  console.log(redTeam);

  let rT;
  if (redTeam) rT = redTeam.map(p => p.id)

  const { userId } = useContext(UserContext);

  return (
    <Container className="players" parentGrid='main'>
      <ul className="player-list">
        {players && players.map(player => {
          if (player.role === 'ghost') return null;
          if (player.id === userId) return null;
          return (
          <Player
            player={player}
            myRole={myRole}
            stage={stage}
            key={player.id}
            playerId={player.id}
            isGhost={player.id === ghostId}
            isRedTeam={myRole === 'witness' && redTeam && rT.includes(player.id)}
            redTeam={redTeam}
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