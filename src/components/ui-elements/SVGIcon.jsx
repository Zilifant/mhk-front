import React from 'react'
import { svg } from '../../util/svgs'
import '../../styles/svgs.css'

const SVGIcon = ({
  className,
  icon
}) => (
  <div className={`svg-icon ${icon} ${className || ''}`}>
    {svg[icon]()}
  </div>
)

export default SVGIcon
