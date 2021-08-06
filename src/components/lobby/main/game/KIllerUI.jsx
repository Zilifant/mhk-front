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
    id,
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
        className='confirm-key-evidence'
        onClick={() => submitSelection({cb:[chooseKeyEvHandler], reset:true})}
        disabled={!minSelected}
      >
        Confirm
      </Button>
    );
  };

  const interact = () => {
    if (stage.id === 'Setup') return keyEvBtn();
    return null;
  };

  return (
    <Container className={`self player`} parentGrid='main'>
      {/* <li className={`p-info username`}>
        {id.slice(0,-5)}
      </li> */}
      <li className={`p-info badge ${badge(canAccuse)}`}>
        *** o7 ***
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
      {types.map((type) => (
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
      ))}
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