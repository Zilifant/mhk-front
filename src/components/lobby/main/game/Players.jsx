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

  const showAsRedTeam = (redTeam, playerId) => {
    const extractIds = (arr) => arr.map(obj => obj.id);
    const canSeeRedTeam = ['witness', 'killer', 'accomplice'];
    const show = canSeeRedTeam.includes(thisPlayer.role)
                 && redTeam
                 && extractIds(redTeam).includes(playerId);
    return show ? true : null;
  };

  const canBeTargeted = thisPlayer.role === 'killer' && currentStage.id === 'second-murder';

  return (
    <Container className="players">
      <ul className="player-list">
        {players && players.map(player => {
          if (player.id === ghost.id) return null;
          if (player.id === userId) return null;
          return (
          <Player
            key={player.id}
            player={player}
            stage={currentStage}
            canBeTargeted={canBeTargeted && player.role !== 'accomplice'}
            isRedTeam={showAsRedTeam(redTeam, player.id)}
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