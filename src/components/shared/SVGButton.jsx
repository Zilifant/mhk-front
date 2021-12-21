// SVG Button //
// Renders an SVG button with consistent css classes. SVGs are methods of the
// `svg` object that return static JSX.

import { svg } from '../../util/svgs';
import '../../styles/svgs.scss';

const SVGButton = ({
  className,
  icon,
  onClick,
  disabled
}) => {
  return (
    <button
      className={`svg-btn ${icon} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {svg[icon]()}
    </button>
  );
};

export default SVGButton;
