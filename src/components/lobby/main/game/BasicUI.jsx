import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
// import Player from '../game/Player'
import { badge, article } from '../../../../util/utils';
import Container from '../../../shared/Container';
import Cards from './Cards';
import '../../../../styles/player.scss';

const BasicUI = ({
  thisPlayer: {
    hand,
    role,
    canAccuse
  }
}) => {

  const types = Object.keys(hand);

  return (
    <Container className='self player never-interacts'>
      <li className={`p-info badge ${badge(canAccuse)}`}>
        BADGE
      </li>
      <li className={`p-info role ${role}`}>
        <div className='wrapper'>
          <div className='subtitle'>You are {article(role)}</div>
          <div className={role}>{role.toUpperCase()}</div>
        </div>
      </li>
      {types.map((type) => (<>
        <div className={`c-group-title ${type}`}>{type}</div>
        <Cards
          key={type}
          myRole={role}
          type={`${role}UI`}
          cardType={type}
          cards={hand[type]}
        />
      </>))}
    </Container>
  );
};

export default BasicUI;