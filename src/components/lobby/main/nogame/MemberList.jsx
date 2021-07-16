import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Member from './Member';

const MemberList = ({ onlineUsers }) => {
  // console.log('MemberList');

  const { userId } = useContext(UserContext);

  return (
    <Container className="lobbymembers" parentGrid='main'>
      <ul className="member-list">
        {onlineUsers.map(member => (
          <Member
            key={member.id}
            memberId={member.id}
            sessUserId={userId}
            isLeader={member.isLeader}
            isReady={member.isReady}
          />
        ))}
      </ul>
    </Container>
  );
};

export default MemberList;