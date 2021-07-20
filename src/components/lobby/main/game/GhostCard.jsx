import React, {
  // useState
} from 'react';
import { useItemSelector } from '../../../../hooks/select-hook';
import Button from '../../../ui-elements/Button';

const GhostCard = ({
  card, confirmedClues, isMine, currentStage
}) => {

  // console.log(card);

  const {
    selectItem,
    confirmSelection,
    maxSelected,
    selectedItems
  } = useItemSelector(card.opts);

  const checkHighlight = (clue) => {
    if (confirmedClues.includes(clue.id)) return 'highlighted';
  };

  const checkSelected = (index) => {
    if (selectedItems[index].isSelected) return 'selected';
  };

  const checkEnabled = (index) => {
    if (!isMine) return false;
    if (currentStage === 'Setup') return false;
    if (card.isLocked) return false;
    if (maxSelected && !selectedItems[index].isSelected) return false;
    return true;
  };

  if (!card.isDisplayed) return null;

  return (
    <div className={`card-wrap--ghost ${card.type}`}>
      <div className={'gc-title'}>{card.id}</div>
      <ul>
        {card.opts.map((opt, index) => (
          <li
            key={opt.id}
            className='gc-clue'
          >
            <button
              className={`gc-clue-btn ${checkHighlight(opt)} ${checkSelected(index)}`}
              disabled={!checkEnabled(index)}
              onClick={() => selectItem(opt.id)}
            >
              {opt.id}
            </button>
          </li>
        ))}
      </ul>
      {isMine && !card.isLocked && <Button
        className='confirm-clue'
        onClick={() => confirmSelection(selectedItems)}
        disabled={!maxSelected}
      >
        Confirm
      </Button>}
    </div>
  );
};

export default GhostCard;