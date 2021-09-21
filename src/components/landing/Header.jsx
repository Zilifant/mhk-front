import React, {
  useState
} from 'react';
import Container from '../shared/Container';
import InfoModal from '../shared/InfoModal';
import { rules } from '../../util/utils';

const Header = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <Container className='head'>
      <div className='landing-title'>MHK</div>
      <button
        className='showrules-btn'
        onClick={() => setShowRules(true)}
      >
        how to play
      </button>
      {showRules && <InfoModal
        info={rules}
        className='rules'
        closeHandler={setShowRules}
      />}
    </Container>
  );
};

export default Header;
