import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Cards from './Cards';

const KillerUI = ({
  thisPlayer: {
    hand,
    role,
    userName,
    accusalSpent
  },
  stage,
  keyEv
}) => {

  const { socket } = useContext(SocketContext);
  const emitKeyEvChoice = (keyEv, socket) => socket.current.emit('keyEvidenceChosen', keyEv);

  const {
    selTracker,
    minSelected,
    selectHandler,
    submitSelection
  } = useParallelSelector(['evidence','means']);

  return (
    <Container className='self self-killer' parentGrid='main'>
      <div className='player-info'>
        <li>{userName} ({role[0].toUpperCase()})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
        {(stage.id === 'Setup') && <Button
          className='confirm-key-evidence'
          onClick={() => submitSelection({cb:[emitKeyEvChoice, socket], reset:true})}
          disabled={!minSelected}
        >
          Confirm
        </Button>}
        {(stage.id === 'Setup') && <Button
          className='confirm-key-evidence'
          onClick={() => console.table(selTracker)}
          disabled={false}
        >
          Confirm
        </Button>}
      </div>
      <Cards
        myRole={role}
        type={`killerUI`}
        cardType='evidence'
        stage={stage}
        cards={hand.evidence}
        selectedId={selTracker.evidence?.id}
        selectCardHandler={selectHandler}
        isMine={true}
        keyEv={keyEv}
      />
      <Cards
        myRole={role}
        type={`killerUI`}
        cardType='means'
        stage={stage}
        cards={hand.means}
        selectedId={selTracker.means?.id}
        selectCardHandler={selectHandler}
        isMine={true}
        keyEv={keyEv}
      />
    </Container>
  );
};

export default KillerUI;