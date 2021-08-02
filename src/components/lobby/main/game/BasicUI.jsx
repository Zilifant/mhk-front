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

  return (
    <Container className='self self-hunter' parentGrid='main'>
      <ul className='player-info'>
        <li>{userName} ({role[0].toUpperCase()})</li>
        <li className={canAccuse ? 'acc-avail' : 'acc-spent'}>[BADGE]</li>
      </ul>
      <Cards
        myRole={role}
        type={`hunterUI`}
        cardType='evidence'
        cards={hand.evidence}
      />
      <Cards
        myRole={role}
        type={`hunterUI`}
        cardType='means'
        cards={hand.means}
      />
    </Container>
  );
};

export default BasicUI;