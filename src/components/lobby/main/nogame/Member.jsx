import React, {
  useContext
} from 'react';
// import Button from '../../../ui-elements/Button';
import Tooltip from '../../../shared/Tooltip';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import { RiVipCrown2Fill } from 'react-icons/ri';
import { FaGhost } from 'react-icons/fa';

const Member = ({
  member,
  iAmLeader,
}) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const { readyHandler, assignGhostHandler, giveLeaderHandler } = useGame(socket);

  const isSelf = userId === member.id;
  const self = isSelf ? 'ml-self' : 'ml-other';
  const ready = member.isReady ? 'ml-ready' : 'ml-notready';
  const leader = member.isLeader ? 'ml-leader' : 'ml-notleader';
  const ghost = member.isAssignedToGhost ? 'ml-ghost' : 'ml-notghost';

  const leaderViewSelf = () => (<>

    <div className={`member leader-icon ${leader}`}>
      <RiVipCrown2Fill/>
    </div>

    <button
      className={`member btn_ready name ${self} ${ready} ${leader}`}
      onClick={() => readyHandler(userId)}
    >
      {member.userName}
    </button>

  </>);

  const leaderViewOther = () => (<>

    <div className='tooltip single right'>
      <button
        className={`member btn_give-leader`}
        onClick={() => giveLeaderHandler(member.id)}
      >
        <RiVipCrown2Fill/>
      </button>
      <Tooltip tip='transferLeader' />
    </div>

    <div
      className={`member name ${self} ${ready} ${leader}`}
    >
      {member.userName}
    </div>

  </>);

  const leaderView = () => (
    <li className='member-grid'>

      {isSelf ? leaderViewSelf() : leaderViewOther()}

      <div className='tooltip single left'>
        <button
          className={`member btn_assign-ghost ${ghost}`}
          onClick={() => assignGhostHandler(member.id)}
        >
          <FaGhost/>
        </button>
        <Tooltip tip='assignGhost' />
      </div>

    </li>
  );

  if (iAmLeader) return leaderView();

  return (
    <li className='member-grid'>

      <div className={`member leader-icon ${leader}`}>
        <RiVipCrown2Fill/>
      </div>

      {isSelf && <button
        className={`member btn_ready name ${self} ${ready} ${leader}`}
        onClick={() => readyHandler(userId)}
      >
        {member.userName}
      </button>}

      {!isSelf && <div
        className={`member name ${self} ${ready} ${leader}`}
      >
        {member.userName}
      </div>}

      <div className={`member ghost-icon ${ghost}`}>
        <FaGhost/>
      </div>

    </li>
  );

  // return (
  //   <li className={`member-wrapper ${self} ${ready} ${leader} ${ghost}`}>
  //     <Button
  //       className='member give-leader'
  //       disabled={!iAmLeader || userId === member.id}
  //       onClick={() => giveLeaderHandler(member.id)}
  //     >L</Button>
  //     <Button
  //       className='member assign-ghost'
  //       disabled={!iAmLeader}
  //       onClick={() => assignGhostHandler(member.id)}
  //     >G</Button>
  //     <Button
  //       className='member ready'
  //       disabled={userId !== member.id}
  //       onClick={() => readyHandler(userId)}
  //     >R</Button>
  //     <Button
  //       className='member name'
  //       disabled={userId !== member.id}
  //       onClick={() => readyHandler(userId)}
  //     >
  //       <div className={`member name-grid`}>
  //         <div className='leader-icon'>{leader === 'leader' && <RiVipCrown2Fill/>}</div>
  //         <div className='name'>{member.userName}</div>
  //       </div>
  //     </Button>
  //   </li>
  // );
};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`