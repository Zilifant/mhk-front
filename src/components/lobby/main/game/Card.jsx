import React, {
  // useState
} from 'react';
import { GiDeathSkull } from 'react-icons/gi';

const Card = ({
  className, id, isHighlighted, isSelected, isEnabled, handleClick
}) => {

  const selected = isSelected ? 'selected' : 'default';
  const highlighted = isHighlighted ? 'highlighted' : 'default';
  // const mine = isMine ? 'mine' : 'other';

  return (
    <button
      className={`card-wrap--${className} ${selected} ${highlighted}`}
      disabled={!isEnabled}
      onClick={() => handleClick(id)}
    >
      <GiDeathSkull className={`card-icon--${className}`} />
      <div className={`card-title--${className}`}>{id}</div>
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