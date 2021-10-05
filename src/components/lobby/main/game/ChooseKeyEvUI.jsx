import React, { useContext } from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import SVGIcon from '../../../ui-elements/SVGIcon';
import Cards from './Cards';

const ChooseKeyEvUI = ({
  hand,
  stage,
  keyEv
}) => {

  const { socket } = useContext(SocketContext);

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

        stage={stage}
        selectedId={selTracker[type]?.id}
        selectCardHandler={selectHandler}
        isMine={true}
        keyEv={keyEv}
      />
    </React.Fragment>))}
  </>);

};

export default ChooseKeyEvUI;