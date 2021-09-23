import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import { badge, article } from '../../../../util/utils';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Cards from './Cards';

const KillerUI = ({
  thisPlayer: {
    hand,
    role,
    canAccuse
  },
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

  const keyEvBtn = () => {
    return (
      <Button
        className='confirm-key-evidence three-d'
        onClick={() => submitSelection({cb:[chooseKeyEvHandler], reset:true})}
        disabled={!minSelected}
      >
        Confirm
      </Button>
    );
  };

  const interact = () => {
    if (stage.id === 'setup') return keyEvBtn();
    return null;
  };

  return (
    <Container className={`self player`}>
      <li className={`p-info badge ${badge(canAccuse)}`}>
        BADGE
      </li>
      <li className={`p-info role ${role}`}>
        <div className='wrapper'>
          <div className='subtitle'>You are {article(role)}</div>
          <div className={role}>{role.toUpperCase()}</div>
        </div>
      </li>
      <li className={`p-info interact`}>
        {interact()}
      </li>
      {types.map((type) => (<>
        <div className={`c-group-title ${type}`}><p>{type}</p></div>
        <Cards
          myRole={role}
          type={`${role}UI`}
          cardType={type}
          key={type}
          stage={stage}
          cards={hand[type]}
          selectedId={selTracker[type]?.id}
          selectCardHandler={selectHandler}
          isMine={true}
          keyEv={keyEv}
        />
      </>))}
    </Container>
  );
};

export default KillerUI;

// {(stage.id === 'Setup') && <Button
// className='confirm-key-evidence'
// onClick={() => console.table(selTracker)}
// disabled={false}
// >
// Confirm
// </Button>}