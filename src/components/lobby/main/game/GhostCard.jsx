import React, {
  // useState,
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useMultiSelector } from '../../../../hooks/multi-selector';
import { useGame } from '../../../../hooks/game-hook';
import Button from '../../../ui-elements/Button';

const GhostCard = ({
  card,
  confirmedClues,
  isMine,
  stage
}) => {

  const { socket } = useContext(SocketContext);

  const {
    chooseClueHandler,
    replaceGhostCardHandler
  } = useGame(socket);

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
    if (stage.id === 'Setup' || stage.type === 'liminal') return false;
    if (card.isLocked) return false;
    return amIEnabled(index);
  };

  const isNew = card.isNew ? 'new' : 'old';

  if (!card.isDisplayed) return null;

  return (
    <div className={`card-wrap--ghost ${card.type} ${isNew}`}>
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
      {isMine && !card.isLocked && stage.type !=='liminal' && <Button
        className='confirm-clue'
        onClick={() => confirmSelection({ cb:[chooseClueHandler], resetTracker: true })}
        disabled={!maxReached}
      >
        Confirm
      </Button>}
      {isMine && stage.type === 'liminal' && card.type === 'clue' && !card.isNew && <Button
        className='gc replace-card'
        onClick={() => replaceGhostCardHandler(card.id)}
        disabled={false}
      >
        REPLACE
      </Button>}
    </div>
  );
};

export default GhostCard;