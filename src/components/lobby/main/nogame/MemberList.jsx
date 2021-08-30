import React, {
  // useEffect,
  // useState,
  // useContext
} from 'react';
import Container from '../../../shared/Container';
import Member from './Member';
import '../../../../styles/memberlist.css';

const MemberList = ({ users, iAmLeader }) => {

  // sort by connection time; most recent user at end of list
  const sortedUsers = users.sort((a, b) => a.connectionTime - b.connectionTime)

  return (
    <Container className="memberlist">
      <ul className="memberlist">
        {sortedUsers.map((member) => {
          if (!member.isOnline) return null;
          return (
            <Member
              key={member.id}
              member={member}
              iAmLeader={iAmLeader}
            />
          )
        })}
      </ul>
    </Container>
  );
};

export default MemberList;