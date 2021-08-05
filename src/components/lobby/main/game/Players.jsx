import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Player from './Player';

const Players = ({
  canIAccuse,
  myRole,
  game: {
    currentStage,
    players,
    redTeam,
    keyEvidence,
    rolesRef,
    ghost
  }
}) => {

  const { userId } = useContext(UserContext);

  const showAsRedTeam = (redTeam, playerId) => {
    const extractIds = (arr) => arr.map(obj => obj.id);
    const canSeeRedTeam = ['witness', 'killer', 'accomplice'];
    const show = canSeeRedTeam.includes(myRole)
                 && redTeam
                 && extractIds(redTeam).includes(playerId);
    return show ? true : null;
  };

  const canBeTargeted = myRole === 'killer' && currentStage.id === 'Second Murder';

  return (
    <Container className="players" parentGrid='main'>
      <ul className="player-list">
        {players && players.map(player => {
          if (player.id === ghost.id) return null;
          if (player.id === userId) return null;
          return (
          <Player
            player={player}
            myRole={myRole}
            stage={currentStage}
            key={player.id}
            playerId={player.id}
            canBeTargeted={canBeTargeted && player.role !== 'accomplice'}
            isRedTeam={showAsRedTeam(redTeam, player.id)}
            keyEv={keyEvidence}
            canTheyAccuse={player.canAccuse}
            hand={player.hand}
            canIAccuse={canIAccuse}
            rolesRef={rolesRef}
          />
        )})}
      </ul>
    </Container>
  );
};

export default Players;