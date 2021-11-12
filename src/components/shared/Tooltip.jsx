// Tooltip

import { parse, render } from '../../util/smd';
import { tooltipText } from '../../util/tooltip-text';
import '../../styles/tooltips.scss';

function renderTooltip(tip, side, opts) {
  if (!tooltipText[tip]) return null;
  const parsedTip = parse(tooltipText[tip]);
  return (
    <div className={(`ttip ${side} ${opts || ''}`).trim()}>
      {render.block(parsedTip)}
    </div>
  );
};

const Tooltip = ({ tip, side, opts }) => renderTooltip(tip, side, opts);

export default Tooltip;
