// Players //

import { useContext } from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Player from './Player';

const Players = ({
  thisPlayer,
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

  console.log(redTeam);

  const extractIds = (arr) => arr.map(obj => obj.id);

  function showAsRedTeam(playerId) {
    const canSeeRedTeam = ['witness', 'killer', 'accomplice'];
    const show = canSeeRedTeam.includes(thisPlayer.role)
                 && redTeam
                 && extractIds(redTeam).includes(playerId);
    return show ? true : null;
  };

  function showAsMurderable(playerId) {
    if (thisPlayer.role !== 'killer') return;
    const stageIsSecondMurder = currentStage.id === 'second-murder';
    const isAccomplice = extractIds(redTeam).includes(playerId);
    if (stageIsSecondMurder && !isAccomplice) return true;
    return false;
  };

  return (
    <Container className="players">
      <ul className="player-list">
        {players && players.map(player => {
          if (player.id === ghost.id) return null; // Don't render ghost.
          if (player.id === userId) return null; // Don't render self.
          return (
          <Player
            key={player.id}
            player={player}
            stage={currentStage}
            isMurderable={showAsMurderable(player.id)}
            isRedTeam={showAsRedTeam(player.id)}
            keyEv={keyEvidence}
            rolesRef={rolesRef}
            thisPlayer={thisPlayer}
          />
        )})}
      </ul>
    </Container>
  );
};

export default Players;