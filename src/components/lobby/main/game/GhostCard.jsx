import React, {
  // useState,
  useContext
} from 'react';
import { useMultiSelector } from '../../../../hooks/multiselector-hook';
import { SocketContext } from '../../../../context/contexts';
import Button from '../../../ui-elements/Button';

const GhostCard = ({
  card, confirmedClues, isMine, currentStage
}) => {

  const { socket } = useContext(SocketContext);

  const emitClueChoice = (clue, socket) => socket.current.emit('clueChosen', clue);

  const {
    selectItemHandler,
    confirmSelection,
    amISelected, amIEnabled,
    maxReached
  } = useMultiSelector({items: card.opts});

  const checkHighlight = (clue) => {
    if (confirmedClues.includes(clue.id)) return 'highlighted';
  };

  const checkSelected = (index) => {
    if (amISelected(index)) return 'selected';
  };

  const checkEnabled = (index) => {
    if (!isMine) return false;
    if (currentStage === 'Setup') return false;
    if (card.isLocked) return false;
    return amIEnabled(index);
  };

  // const selectItemHandler = (item) => {
  //   const obj = {item: item, cb:[null, null]};
  //   return selectItem(obj)
  // };

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
              onClick={() => selectItemHandler(opt.id)}
            >
              {opt.id}
            </button>
          </li>
        ))}
      </ul>
      {isMine && !card.isLocked && <Button
        className='confirm-clue'
        onClick={() => confirmSelection({ cb:[emitClueChoice, socket], resetTracker: true })}
        disabled={!maxReached}
      >
        Confirm
      </Button>}
    </div>
  );
};

export default GhostCard;