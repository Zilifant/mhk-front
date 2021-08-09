import React, {
  // useEffect,
  // useState,
  // useContext
} from 'react';
import Container from '../../../shared/Container';
import Member from './Member';
import '../../../../styles/memberlist.css';

const MemberList = ({ users, iAmLeader }) => {

  return (
    <Container className="lobbymembers" parentGrid='main'>
      {<ul className="member-list">
        {users.map((member) => {
          if (!member.isOnline) return null;
          return (
            <Member
              key={member.id}
              member={member}
              iAmLeader={iAmLeader}
            />
          )
        })}
      </ul>}
    </Container>
  );
};

export default MemberList;