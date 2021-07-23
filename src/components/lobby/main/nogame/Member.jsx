import React from 'react';
import Button from '../../../ui-elements/Button';

// Note: ready/leader indicators R and L created by CSS

const Member = ({
  sessUserId, memberId, isLeader, isReady, socket, selectItemCallback, selectItemHandler, isSelected, isEnabled, iAmLeader, isAssignedGhost
}) => {

  const selfOther = (sessUserId === memberId) ? 'self' : 'other';
  const readyOrNot = (isReady) ? 'ready' : 'notready';
  const selected = isSelected ? 'selected' : 'default';
  // let onOffline = (onlineMembers.some(oM => oM.userId === member)) ? 'online' : 'offline';

  return (
    <div className='m-wrapper'>
      {iAmLeader && <Button
        key={`btn-${memberId}`}
        className={`btn assign-ghost-btn ${selected}`}
        disabled={!isEnabled}
        onClick={() => selectItemHandler(memberId, [null, null], false, [selectItemCallback, socket], false)}
      >
        GHOST
      </Button>}
      <li
        className={`m-${selfOther} m-${readyOrNot} ${isLeader && 'm-leader'}`}
        key={memberId}
      >
        {memberId} {isAssignedGhost && <span className='assigned-ghost'>GHOST</span>}
      </li>
    </div>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`