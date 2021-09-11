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
    id,
    canAccuse
  }
}) => {

  const types = Object.keys(hand);

  return (
    <Container className='self player'>
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
      </li>
      {types.map((type) => (
        <Cards
          key={type}
          myRole={role}
          type={`${role}UI`}
          cardType={type}
          cards={hand[type]}
        />
      ))}
    </Container>
  );
};

export default BasicUI;