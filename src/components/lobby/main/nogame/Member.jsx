import React, {
  useContext
} from 'react';
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

  const { readyHandler, assignGhostHandler, giveLeaderHandler } = useGame(socket);

  const isSelf = userId === member.id;
  const self = isSelf ? 'ml-self' : 'ml-other';
  const ready = member.isReady ? 'ml-ready' : 'ml-notready';
  const leader = member.isLeader ? 'ml-leader' : 'ml-notleader';
  const ghost = member.isAssignedToGhost ? 'ml-ghost' : 'ml-notghost';

  const LeaderIcon = () => {

    if (!iAmLeader || (iAmLeader && isSelf)) return (
      <SVGIcon
        icon='crown'
        className={leader}
      />
    );

    if (iAmLeader && !isSelf) return (
      <div className='tooltip right'>
        <SVGButton
          icon='crown'
          className='transfer-leader'
          onClick={() => giveLeaderHandler(member.id)}
          disabled={false}
        />
        <Tooltip tip='transferLeader' />
      </div>
    );
  }

  const GhostIcon = () => {

    if (!iAmLeader) return (
      <SVGIcon
        icon='ghost'
        className={ghost}
      />
    );

    if (iAmLeader) return (
      <div className='tooltip left'>
        <SVGButton
          icon='ghost'
          className={`assign-ghost ${ghost}`}
          onClick={() => assignGhostHandler(member.id)}
          disabled={false}
        />
        <Tooltip tip='assignGhost' />
      </div>
    );

  };

  const ReadyToggle = () => {

    if (!isSelf) return null;

    return (
      <SVGButton
        icon={member.isReady ? 'minus' : 'plus'}
        className={`ready-toggle ${ready}`}
        onClick={() => readyHandler(userId)}
      />
    );

  };

  return (
    <li className={`member_grid ${ready} ${self}`}>
      <div className="leader_icon">{LeaderIcon()}</div>
      <div className="member_name">{member.userName}</div>
      <div className="ghost_icon">{GhostIcon()}</div>
      <div className="ready_toggle">{ReadyToggle()}</div>
    </li>
  );

};

export default Member;

// `${memberId.slice(0,-5)}-${memberId.slice(-4)}`