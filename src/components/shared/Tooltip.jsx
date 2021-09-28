
// import { parseSMDLines, renderStyledLines } from '../../util/styled-text';
import { parse, render } from '../../util/smd';
import { tooltipText } from '../../util/tooltip-text';
import '../../styles/tooltips.scss';

function renderTooltip(tip, side, opts) {
  if (!tooltipText[tip]) return null;
  const parsedTip = parse(tooltipText[tip]);
  return (
    <div className={(`ttip ${side} ${opts || ''}`).trim()}>
      {render.block(parsedTip)}
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
