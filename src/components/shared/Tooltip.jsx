
import { parseSMDLines, renderStyledLines } from '../../util/styled-text';
import { tooltipText } from '../../util/tooltip-text';
import '../../styles/tooltips.scss';

function renderTooltip(tip, side, opts) {
  if (!tooltipText[tip]) return null;
  const parsedTip = parseSMDLines({lines: tooltipText[tip]});
  return (
    <div className={(`ttip ${side} ${opts || ''}`).trim()}>
      {renderStyledLines(parsedTip)}
      {/* <i className='arrow'></i> */}
    </div>
  );
};

const Tooltip = ({
  tip,
  side,
  opts
}) => renderTooltip(tip, side, opts);

export default Tooltip;
