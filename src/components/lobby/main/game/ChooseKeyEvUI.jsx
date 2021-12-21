// Choose Key Evidence UI //
// Alternative version of the cards section of PlayerUI; used by killer during
// the setup game stage.

import React, { useContext } from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector-hook';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import SVGIcon from '../../../shared/SVGIcon';
import Cards from './Cards';

const ChooseKeyEvUI = ({
  hand,
  stage,
  keyEv
}) => {

  const { socket } = useContext(SocketContext);

  // `hand` includes two types of card: `means` and `evidence`.
  const types = Object.keys(hand);

  const {
    selTracker,
    minSelected,
    selectHandler,
    submitSelection
  } = useParallelSelector(types);

  const {
    chooseKeyEvHandler
  } = useGame(socket);

  return (<>
    <li className={`p-info interact con-key-ev`}>
      <button
        className='confirm-btn key-evidence'
        onClick={() => submitSelection({cb:[chooseKeyEvHandler], reset:true})}
        disabled={!minSelected}
      >
        <SVGIcon
          icon='check'
        />
      </button>
    </li>
    {types.map((type) => (<React.Fragment key={type}>
      <div className={`c-group-title ${type}`}>{type}</div>
      <Cards
        myRole='killer'
        type='killerUI'
        cardType={type}
        cards={hand[type]}
        keyEv={keyEv}

        stage={stage}
        selectedId={selTracker[type]?.id}
        selectCardHandler={selectHandler}
        isMine={true}
      />
    </React.Fragment>))}
  </>);

};

export default ChooseKeyEvUI;