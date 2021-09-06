import React from 'react';
import { svg } from '../../util/svgs';
import '../../styles/svgs.css';

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
