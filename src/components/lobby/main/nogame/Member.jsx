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

  const { readyHandler, assignGhostHandler, giveLeaderHandler } = useGame(socket);

  const self = userId === member.id ? 'self' : 'other';
  const ready = member.isReady ? 'ready' : 'notready';
  const leader = member.isLeader ? 'leader' : 'notleader';
  const ghost = member.isAssignedToGhost ? 'ghost' : 'notghost';

  return (
    <li className={`member-wrapper ${self} ${ready} ${leader} ${ghost}`}>
      <Button
        className='member give-leader'
        disabled={!iAmLeader || userId === member.id}
        onClick={() => giveLeaderHandler(member.id)}
      >L</Button>
      <Button
        className='member assign-ghost'
        disabled={!iAmLeader}
        onClick={() => assignGhostHandler(member.id)}
      >G</Button>
      <Button
        className='member ready'
        disabled={userId !== member.id}
        onClick={() => readyHandler(userId)}
      >R</Button>
      <div
        className='member name'
      >{member.userName}</div>
    </li>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`