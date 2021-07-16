import React from 'react';

// Note: ready/leader indicators R and L created by CSS

const Member = ({ sessUserId, memberId, isLeader, isReady}) => {

  const selfOther = (sessUserId === memberId) ? 'self' : 'other';
  const readyOrNot = (isReady) ? 'ready' : 'notready';
  // let onOffline = (onlineMembers.some(oM => oM.userId === member)) ? 'online' : 'offline';

  return (
    <li
      className={`m-${selfOther} m-${readyOrNot} ${isLeader && 'm-leader'}`}
      key={memberId}
    >
      {memberId}
    </li>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`