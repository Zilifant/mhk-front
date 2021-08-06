import React, {
  useContext
} from 'react';
import Button from '../../../ui-elements/Button';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';

const Member = ({
  member,
  iAmLeader,
}) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const { assignGhostHandler } = useGame(socket);

  const self = userId === member.id ? 'self' : 'other';
  const ready = member.isReady ? 'ready' : 'notready';
  const leader = member.isLeader ? 'leader' : 'notleader';
  const ghost = member.isAssignedToGhost ? 'assigned-ghost' : 'notghost';

  return (
    <div className='m-wrapper'>
      {iAmLeader && <Button
        key={`btn-${member.id}`}
        className={`btn assign-ghost ${ghost}`}
        disabled={false}
        onClick={() => assignGhostHandler(member.id)}
      >
        GHOST
      </Button>}
      <li
        className={`m-${self} m-${ready} m-${leader} m-${ghost}`}
        key={member.id}
      >
        {member.userName}
      </li>
    </div>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`