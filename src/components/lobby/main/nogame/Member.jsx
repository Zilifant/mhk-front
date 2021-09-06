import React, {
  useContext
} from 'react';
import Tooltip from '../../../shared/Tooltip';
import SVGButton from '../../../ui-elements/SVGButton';
import SVGIcon from '../../../ui-elements/SVGIcon';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import '../../../../styles/svgs.css';

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

  const leaderViewSelf = () => (

    <button
      className={`member btn_ready name ${self} ${ready} ${leader}`}
      onClick={() => readyHandler(userId)}
    >
      <div className='name-grid'>
        <div className="leader_tooltip tooltip single right">
          <SVGIcon icon='crown' />
          <Tooltip tip='youAreLeader' />
        </div>
        <div className='name'>{member.userName}</div>
      </div>
    </button>

  );

  const leaderViewOther = () => (

    <div className={`member wrapper name ${self} ${ready} ${leader}`}>
      <div className='name-grid'>
        <div className="leader_tooltip tooltip single right">
          <SVGButton
            className='member btn_give-leader'
            icon='crown'
            onClick={() => giveLeaderHandler(member.id)}
            disabled={false}
          />
          <Tooltip tip='transferLeader' />
        </div>
        <div className={`name ${self} ${ready} ${leader}`}>{member.userName}</div>
      </div>
    </div>

  );

  const leaderView = () => (
    <li className='member-grid'>

      {isSelf ? leaderViewSelf() : leaderViewOther()}

      <div className='assign_ghost_tooltip tooltip single left'>
        <SVGButton
          className={`btn_assign-ghost ${ghost}`}
          icon='ghost'
          onClick={() => assignGhostHandler(member.id)}
          disabled={false}
        />
        <Tooltip tip='assignGhost' />
      </div>

    </li>
  );

  if (iAmLeader) return leaderView();

  return (
    <li className='member-grid'>

      {isSelf && <button
        className={`thfi member btn_ready name ${self} ${ready} ${leader}`}
        onClick={() => readyHandler(userId)}
      >
        <div className='name-grid'>
          <div className="leader_tooltip tooltip single right">
            <SVGIcon
              icon='crown'
              className={`not-leader-view ${leader}`}
            />
          </div>
          <div className='name'>{member.userName}</div>
        </div>
      </button>}

      {!isSelf && <div
        className={`thfi member wrapper name ${self} ${ready} ${leader}`}
      >
        <div className='name-grid'>
          <div className="leader_tooltip tooltip single right">
            <SVGIcon
              icon='crown'
              className={`not-leader-view ${leader}`}
            />
            </div>
            <div className='name'>{member.userName}</div>
          </div>
        </div>}

      <div className={`member ghost-icon ${ghost}`}>
        <SVGIcon
          className={`${ghost}`}
          icon='ghost'
        />
      </div>

    </li>
  );

};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`