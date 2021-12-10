// Member List //
// TO DO: Rename `member` to `user`.

import Container from '../../../shared/Container';
import Member from './Member';
import '../../../../styles/memberlist.scss';

const MemberList = ({ users, iAmLeader }) => {

  // Sort users by socket connection time, for users who leave and rejoin. Most
  // recently connected user appears at end of list.
  const sortedUsers = users.sort((a, b) => a.connectionTime - b.connectionTime);

  return (
    <Container className="memberlist">
      <ul className="memberlist">
        {sortedUsers.map((member) => {
          if (!member.isOnline) return null; // Skip offline users.
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