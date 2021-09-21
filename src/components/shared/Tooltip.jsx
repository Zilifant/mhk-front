
import { parseSMDLines, renderStyledLines } from '../../util/styled-text';
import '../../styles/tooltips.scss';

const tooltips = {
  waitMorePlayers: 'At least ^_k_4^ players are needed to start.<^_k_5^ or more are recommended.',
  advRoles: 'At least ^_k_5^ players are needed to use the ^_k_Witness^ and ^_k_Accomplice^ roles.<^_k_6^ or more are recommended.<For the most balanced game, use both roles (or neither).<>f>Using only the ^_k_Witness^ may make the game harder for the ^_k_Killer^.<>f>Using only the ^_k_Accomplice^ may make things harder for the ^_k_Hunters^ and the ^_k_Ghost^.',
  timerSetup: '^_e_Optional:^ Limit how many ^_k_minutes^ players have for discussion each round.<>f>The round will continue even after the timer runs out. The lobby leader may choose how strictly to enforce the limit.',
  assignGhost: '^_e_Optional:^ Assign a player to be the ^_k_Ghost^.',
  youAreLeader: 'You are the lobby leader.',
  transferLeader: 'Transfer ^_k_leadership^ to this user.',
  copyUrl: 'Copy lobby URL',
  hideShowName: 'Hide/show lobby name',
  streamingMode: 'When ^_k_Streaming Mode^ is active, the Lobby\'s ID and URL will be hidden by default.'
};

function renderTooltip(tip, side) {
  if (!tooltips[tip]) return null;
  const parsedTip = parseSMDLines({lines: tooltips[tip]});
  return (
    <div className={`ttip ${side}`}>
      {renderStyledLines(parsedTip)}
      {/* <i className='arrow'></i> */}
    </div>
  );
};

const Tooltip = ({
  tip,
  side
}) => renderTooltip(tip, side);

export default Tooltip;
