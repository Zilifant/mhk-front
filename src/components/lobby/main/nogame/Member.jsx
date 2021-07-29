import React from 'react';
import Button from '../../../ui-elements/Button';

// Note: ready/leader indicators R and L created by CSS

const Member = ({
  sessUserId,
  memberId,
  isLeader,
  isReady,
  socket,
  selectItemHandler,
  iAmLeader,
  isAssignedToGhost
}) => {

  // let onOffline = (onlineMembers.some(oM => oM.userId === member)) ? 'online' : 'offline';
  const self = (sessUserId === memberId) ? 'self' : 'other';
  const ready = (isReady) ? 'ready' : 'notready';
  const leader = isLeader ? 'leader' : 'notleader';
  const ghost = isAssignedToGhost ? 'assigned-ghost' : 'notghost';

  return (
    <div className='m-wrapper'>
      {iAmLeader && <Button
        key={`btn-${memberId}`}
        className={`btn assign-ghost ${ghost}`}
        disabled={false}
        onClick={() => selectItemHandler(memberId, socket)}
      >
        GHOST
      </Button>}
      <li
        className={`m-${self} m-${ready} m-${leader} m-${ghost}`}
        key={memberId}
      >
        {memberId}
      </li>
    </div>
  );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`