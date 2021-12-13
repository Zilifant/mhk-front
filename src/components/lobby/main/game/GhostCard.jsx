// Ghost Card //

import { useContext } from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useMultiSelector } from '../../../../hooks/multi-selector-hook';
import { useGame } from '../../../../hooks/game-hook';

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

  function checkHighlight(clue) {
    if (confirmedClues.includes(clue.id)) return 'highlighted';
  };

  function checkSelected(index) {
    if (amISelected(index)) return 'selected';
  };

  function checkEnabledByStage() {
    const disabledStageTypes = ['liminal', 'setup', 'postgame'];
    const disabledStageIds = ['second-murder'];
    if (disabledStageTypes.includes(stage.type)) return true;
    if (disabledStageIds.includes(stage.id)) return true;
    return false;
  }

  function checkEnabled(index) {
    // If viewing client is not ghost, buttons are always disabled.
    if (!isMine) return false;
    // Buttons are disabled during certain game stages.
    if (checkEnabledByStage()) return false;
    // After an option has been selected and confirmed, card is locked and all
    // buttons remain disabled.
    if (card.isLocked) return false;
    // Finally, check if button is disabled by the multiselector hook.
    return amIEnabled(index);
  };

  const newCard = card.isNew ? 'new' : 'old';
  const lockedCard = card.isLocked ? 'locked' : 'unlocked';

  const confirmClueBtn = () => {
    return (
      <button
        className='btn btn--gc confirm-clue'
        onClick={() => confirmSelection({ cb:[chooseClueHandler], resetTracker: false })}
        disabled={!maxReached}
      >
        confirm
      </button>
    );
  };

  const replaceCardBtn = () => {
    return (
      <button
        className='btn btn--gc replace-card'
        onClick={() => replaceGhostCardHandler(card.id)}
        disabled={false}
      >
        replace
      </button>
    );
  };

  const confirmBtns = () => {
    if (stage.type !== 'liminal' && !card.isLocked) return confirmClueBtn();
    if (stage.type === 'liminal' && card.type === 'clue' && !card.isNew) return replaceCardBtn();
    return <div className='gc-conbtn-placeholder'>-</div>
  };

  if (!card.isDisplayed) return null;

  return (
    <div className={`card-wrap--ghost ${card.type} ${newCard}`}>
      <div className={'gc-title'}><h3>{card.id}</h3></div>
      <ul>
        {card.opts.map((opt, index) => (
          <li
            key={opt.id}
            className='gc-clue'
          >
            <button
              className={`gc-clue-btn ${checkHighlight(opt)} ${checkSelected(index)} ${lockedCard}`}
              disabled={!checkEnabled(opt.id)}
              onClick={() => selectItemHandler(opt.id)}
            >
              {opt.id}
            </button>
          </li>
        ))}
      </ul>
      {isMine && confirmBtns()}
    </div>
  );
};

export default GhostCard;