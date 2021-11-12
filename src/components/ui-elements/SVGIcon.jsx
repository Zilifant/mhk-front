// SVG Icon

import { svg } from '../../util/svgs'
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
