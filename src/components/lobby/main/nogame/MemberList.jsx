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
    <Container className="memberlist" parentGrid='main'>
      {<ul className="memberlist">
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