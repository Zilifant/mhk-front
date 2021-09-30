import React, {
  useContext
} from 'react';
import { SocketContext } from '../../context/contexts';
import { useGame } from '../../hooks/game-hook';
import Container from '../shared/Container';
import Tooltip from './Tooltip';
import SVGButton from '../ui-elements/SVGButton';
import InfoModal from './InfoModal';
import { rules, about } from '../../util/text';
import '../../styles/footer.scss';

const Footer = ({
  showClearBtn
}) => {

  const { socket } = useContext(SocketContext);
  const { clearGameHandler } = useGame(socket);

  return (
    <Container className='foot'>
      {/* <div className='footer-wrap'> */}
        <div className='footer-bar'>
          {showClearBtn && <div className='ttip-parent'>
            <SVGButton
              className='cleargame three-d'
              onClick={clearGameHandler}
              icon='plus'
            />
            <Tooltip
              tip='clearGameWarn'
              side='right'
              opts='oneline'
            />
          </div>}
          <InfoModal
            className='rules footer'
            btnClassName='flat'
            buttonContent='rulebook'
            info={rules}
          />
          {/* <div className='footer-placeholder'>-</div> */}
          <div className='footer-content'>
            <div className='footer-text'>Copyright 2021 Zilifant</div>
            <InfoModal
            className='about footer'
            btnClassName='flat'
            buttonContent='about'
            info={about}
          />
          </div>

        </div>
      {/* </div> */}
      <div className='margin-hack'></div>
    </Container>
  );
};

export default Footer;