// Member //
// TO DO: Rename `member` to `user`.

import { useContext } from 'react';
import Tooltip from '../../../shared/Tooltip';
import SVGButton from '../../../ui-elements/SVGButton';
import SVGIcon from '../../../ui-elements/SVGIcon';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';

const Member = ({
  member,
  iAmLeader,
}) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    readyHandler,
    assignGhostHandler,
    giveLeaderHandler
  } = useGame(socket);

  const isSelf = userId === member.id;
  const self = isSelf ? 'ml-self' : 'ml-other';
  const ready = member.isReady ? 'ml-ready' : 'ml-notready';
  const leader = member.isLeader ? 'ml-leader' : 'ml-notleader';
  const ghost = member.isAssignedToGhost ? 'ml-ghost' : 'ml-notghost';

  // If viewing client is the leader, show the leader icon/button for all users
  // except itself. (The leader can't transfer leadership to themselves.)
  const LeaderIcon = () => {

    if (!iAmLeader || (iAmLeader && isSelf)) return (
      <SVGIcon
        icon='crown'
        className={leader}
      />
    );

    if (iAmLeader && !isSelf) return (
      <div className='ttip-parent'>
        <SVGButton
          icon='crown'
          className='transfer-leader'
          onClick={() => giveLeaderHandler(member.id)}
          disabled={false}
        />
        <Tooltip tip='transferLeader' side='bottom' opts='singleline'/>
      </div>
    );
  }

  // If viewing client is the leader, show ghost svg as button for all users,
  // else show as icon. Icon hidden with CSS on users not assigned to ghost.
  const GhostIcon = () => {

    if (!iAmLeader) return (
      <SVGIcon
        icon='ghost'
        className={ghost}
      />
    );

    if (iAmLeader) return (
      <div className='ttip-parent'>
        <SVGButton
          icon='ghost'
          className={`assign-ghost ${ghost}`}
          onClick={() => assignGhostHandler(member.id)}
          disabled={false}
        />
        <Tooltip tip='assignGhost' side='right' opts='singleline'/>
      </div>
    );

  };

  const ReadyToggle = () => {

    if (!isSelf) return null; // Skip for other users.

    return (
      <button
        className={`ready-toggle-btn ${ready}`}
        onClick={() => readyHandler(userId)}
        disabled={false}
      >
        {member.isReady ? 'ready' : 'not ready'}
      </button>
    );

  };

  return (
    <li className='ready_grid'>
      <div className={`member_grid ${ready} ${self}`}>
        <div className="ghost_icon">{GhostIcon()}</div>
        <div className="leader_icon">{LeaderIcon()}</div>
        <div className="member_name">{member.userName}</div>
      </div>
      <div className="ready_toggle">{ReadyToggle()}</div>
    </li>
  );

};

export default Member;