import React, {
  // useState
} from 'react';
import { capitalize } from '../../../../util/utils'
// import { GiDeathSkull } from 'react-icons/gi';

const Card = ({
  card,
  className,
  id,
  isHighlighted,
  isSelected,
  isEnabled,
  handleClick
}) => {

  const selected = isSelected ? 'selected' : 'default';
  const highlighted = isHighlighted ? 'highlighted' : 'default';

  return (
    <button
      className={`card-wrap--player ${className} ${selected} ${highlighted}`}
      disabled={!isEnabled}
      onClick={() => handleClick(card)}
    >
      {/* <GiDeathSkull className={`card-icon ${className}`} /> */}
      <div className={`card-title ${className}`}>{capitalize(id)}</div>
    </button>
  );
};

export default Card;

// className
// id
// isMine
// isHighlighted
// isSelected
// isEnabled
// handleClick

// DEF if (imGhost) EN = false
// DEF if (imHunter && isMine) EN = false

// if ((imGhost || imKiller) && isKeyEv) HI = true
// if (stage === killerChoosing && imKiller && isMine) EN = true
// if (stage === anyRound && (imKiller || imHunter) && !isMine) EN = true