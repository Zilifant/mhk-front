import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import Container from '../../../shared/Container';
import Hand from './Hand';

const HunterUI = ({
  thisPlayer: { hand, role, userName, accusalSpent }
}) => {

  return (
    <Container className='self self-hunter' parentGrid='main'>
      <ul className='player-info'>
        <li>{userName} ({role[0]})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
      </ul>
      <Hand
        myRole={role}
        type={`hunterUI`}
        cards={hand}
      />
    </Container>
  );
};

export default HunterUI;