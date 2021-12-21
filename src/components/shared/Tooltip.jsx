// Tooltip //
// Small textbox that displays while another element is hovered; displays
// adjacent to that element.

// `side` prop defines what side of hovered element tip will appear on.
// (`top`, `bottom`, `left`, `right`; defaults to `bottom`.)

// `opts` prop defines whether text should wrap.
// (`singleline` for short tips; defaults to wrapping text.)

import { parse, render } from '../../util/styled-markdown';
import { tooltipStrings } from '../../util/static-content/tooltip-strings';
import '../../styles/tooltips.scss';

function renderTooltip(tip, side, opts) {
  if (!tooltipStrings[tip]) return null;
  const parsedTip = parse(tooltipStrings[tip]);
  return (
    <div className={(`ttip ${side || 'bottom'} ${opts || 'wrap'}`).trim()}>
      {render.block(parsedTip)}
    </div>
  );
};

const Tooltip = ({ tip, side, opts }) => renderTooltip(tip, side, opts);

export default Tooltip;
