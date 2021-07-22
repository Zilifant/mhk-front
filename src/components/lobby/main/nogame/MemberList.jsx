import React, {
  // useEffect,
  // useState,
  useContext
} from 'react';
import { UserContext } from '../../../../context/contexts';
import { useMultiSelector } from '../../../../hooks/multiselector-hook';
import Container from '../../../shared/Container';
import Member from './Member';

const MemberList = ({ onlineUsers }) => {

  const { userId } = useContext(UserContext);

  const {
    selectItem,
    maxReached,
    selTracker
  } = useMultiSelector({items: onlineUsers});

  const checkEnabled = (index) => {
    if (maxReached && !selTracker[index].isSelected) return false;
    return true;
  };

  const checkSelected = (index) => {
    if (!selTracker[index]) return null;
    return selTracker[index].isSelected
  };

  const selectItemHandler = (item) => {
    const obj = {item: item, cb:[null, null]};
    return selectItem(obj)
  };

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
            selectItemHandler={selectItemHandler}
            enabled={checkEnabled(index)}
            isSelected={checkSelected(index)}
          />
        ))}
      </ul>}
    </Container>
  );
};

export default MemberList;