import React from 'react';
import Button from '../../../ui-elements/Button';

// Note: ready/leader indicators R and L created by CSS

const Member = ({
  sessUserId, memberId, isLeader, isReady, selectItemHandler, isSelected, enabled
}) => {

  const selfOther = (sessUserId === memberId) ? 'self' : 'other';
  const readyOrNot = (isReady) ? 'ready' : 'notready';
  const selected = isSelected ? 'selected' : 'default';
  // let onOffline = (onlineMembers.some(oM => oM.userId === member)) ? 'online' : 'offline';

  return (
    <>
      <Button
        key={`btn-${memberId}`}
        className={`btn assign-ghost-btn ${selected}`}
        disabled={!enabled}
        onClick={() => selectItemHandler(memberId)}
      >
        GHOST
      </Button>
      <li
        className={`m-${selfOther} m-${readyOrNot} ${isLeader && 'm-leader'}`}
        key={memberId}
      >
        {memberId}
      </li>
    </>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`