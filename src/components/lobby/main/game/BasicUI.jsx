import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import Container from '../../../shared/Container';
import Cards from './Cards';

const BasicUI = ({
  thisPlayer: {
    hand,
    role,
    userName,
    canAccuse
  }
}) => {

  const types = Object.keys(hand);

  return (
    <Container className='self self-hunter' parentGrid='main'>
      <ul className='player-info'>
        <li>{userName} ({role[0].toUpperCase()})</li>
        <li className={canAccuse ? 'acc-avail' : 'acc-spent'}>[BADGE]</li>
      </ul>
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