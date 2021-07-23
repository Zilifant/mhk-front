import React, {
  useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useMultiSelector } from '../../../../hooks/multiselector-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Member from './Member';

const MemberList = ({ onlineUsers, iAmLeader }) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const emitGhostAssignment = (userId, socket) => socket.current.emit('ghostAssigned', userId);

  const {
    selectItemHandler,
    amISelected, amIEnabled,
    updateTracker,
    selTracker,
    confirmSelection
  } = useMultiSelector({items: onlineUsers});

  useEffect(() => {
    console.log('%cuseEffect','color:#79f9ae');
    updateTracker(onlineUsers);
  }, [onlineUsers]);

  return (
    <Container className="lobbymembers" parentGrid='main'>
      {selTracker && <ul className="member-list">
        {onlineUsers.map((member, index) => (
          <Member
            key={member.id}
            memberId={member.id}
            sessUserId={userId}
            isLeader={member.isLeader}
            isReady={member.isReady}
            isAssignedGhost={member.isAssignedToGhost}
            selectItemCallback={emitGhostAssignment}
            socket={socket}
            selectItemHandler={selectItemHandler}
            isSelected={amISelected(member.id)}
            isEnabled={amIEnabled(member.id)}
            iAmLeader={iAmLeader}
          />
        ))}
      </ul>}
      {iAmLeader && selTracker && <Button
      className='ghost-confirm-btn'
        onClick={() => confirmSelection({ cb:[emitGhostAssignment, socket], resetTracker: false })}
      >
        Confirm
      </Button>}
    </Container>
  );
};

export default MemberList;