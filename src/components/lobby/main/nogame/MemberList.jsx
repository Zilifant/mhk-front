import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext, SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Member from './Member';

const MemberList = ({ onlineUsers, iAmLeader }) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const emitGhostAssignment = (userId, socket) => socket.current.emit('ghostAssigned', userId);

  return (
    <Container className="lobbymembers" parentGrid='main'>
      {<ul className="member-list">
        {onlineUsers.map((member) => (
          <Member
            key={member.id}
            memberId={member.id}
            sessUserId={userId}
            isLeader={member.isLeader}
            isReady={member.isReady}
            isAssignedToGhost={member.isAssignedToGhost}
            socket={socket}
            selectItemHandler={emitGhostAssignment}
            iAmLeader={iAmLeader}
          />
        ))}
      </ul>}
    </Container>
  );
};

export default MemberList;