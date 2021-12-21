// SVG Icon //
// Renders an SVG with consistent css classes. SVGs are methods of the `svg`
// object that return static JSX.

import { svg } from '../../util/static-content/svgs-html'
import '../../styles/svgs.scss'

const SVGIcon = ({
  className,
  icon
}) => (
  <div className={`svg-icon ${icon} ${className || ''}`}>
    {svg[icon]()}
  </div>
)

export default SVGIcon
