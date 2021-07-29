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

  const { userId } = useContext(UserContext);
  // const { socket } = useContext(SocketContext);

  const showAsRedTeam = (redTeam, playerId) => {
    const extractIds = (arr) => arr.map(obj => obj.id);
    const canSeeRedTeam = ['witness', 'killer', 'accomplice'];
    const show = canSeeRedTeam.includes(myRole)
                 && redTeam
                 && extractIds(redTeam).includes(playerId);
    return show ? true : null;
  };

  const canBeTargeted = myRole === 'killer' && stage === 'Second Murder';

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
            canBeTargeted={canBeTargeted && player.role !== 'accomplice'}
            isGhost={player.id === ghostId}
            isRedTeam={showAsRedTeam(redTeam, player.id)}
            keyEv={keyEv}
            accusalSpent={player.accusalSpent}
            hand={player.hand}
            canAccuse={canAccuse}
          />
        )})}
      </ul>
    </Container>
  );
};

export default Players;