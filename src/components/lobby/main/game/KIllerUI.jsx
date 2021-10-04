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
import SVGIcon from '../../../ui-elements/SVGIcon';
import Cards from './Cards';
import '../../../../styles/player.scss';

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
      <li className={`p-info interact con-key-ev`}>
        <Button
          className='confirm-key-evidence three-d'
          onClick={() => submitSelection({cb:[chooseKeyEvHandler], reset:true})}
          disabled={!minSelected}
        >
          Confirm
        </Button>
      </li>
    );
  };

  const interact = () => {
    if (stage.id === 'setup') return keyEvBtn();
    return null;
  };

  return (
    <Container className={`self player ${stage.id !== 'setup' && 'never-interacts'}`}>
      {/* <li className={`p-info badge ${badge(canAccuse)}`}>
        BADGE
      </li> */}
      <li className={`p-info role ${role}`}>
        <div className='wrapper'>
          <SVGIcon
            icon='crown'
            className={`badge ${badge(canAccuse)}`}
          />
          <div className='subtitle'>You are {article(role)}</div>
          <div className={'role' + ' ' + role}>{role.toUpperCase()}</div>
        </div>
      </li>
      {interact()}
      {types.map((type) => (<React.Fragment key={type}>
        <div className={`c-group-title ${type}`}>{type}</div>
        <Cards
          myRole={role}
          type={`${role}UI`}
          cardType={type}
          // key={type}
          stage={stage}
          cards={hand[type]}
          selectedId={selTracker[type]?.id}
          selectCardHandler={selectHandler}
          isMine={true}
          keyEv={keyEv}
        />
      </React.Fragment>))}
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