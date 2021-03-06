// Footer //

import { useContext } from 'react';
import { SocketContext } from '../../context/contexts';
import { useGame } from '../../hooks/game-hook';
import { VERSION } from '../../util/utils';
import Container from '../shared/Container';
import Tooltip from './Tooltip';
import SVGButton from '../shared/SVGButton';
import InfoModal from '../modal/InfoModal';
import { rules } from '../../util/static-content/rules-html';
import { about } from '../../util/static-content/about-html';
import '../../styles/footer.scss';

const Footer = ({
  showClearBtn // `true` if user is the leader.
}) => {

  const { socket } = useContext(SocketContext);
  const { clearGameHandler } = useGame(socket);

  return (
    <Container className='foot'>
      <div className='footer-wrap'>
        <div className='footer-bar'>
          <InfoModal
            className='rules footer'
            btnClassName='footer-btn'
            buttonContent='rulebook'
            titlebarContent='game rules'
            info={rules}
          />
          <div className='footer-content'>
            <div className='footer-text'>v {VERSION}</div>
            <InfoModal
              className='about footer'
              btnClassName='footer-btn'
              buttonContent='about'
              titlebarContent='about the app'
              info={about}
            />
            {showClearBtn && <div className='ttip-parent'>
              <SVGButton
                className='cleargame'
                onClick={clearGameHandler}
                icon='plus'
              />
              <Tooltip
                tip='clearGameWarn'
                side='left'
                opts='singleline'
              />
            </div>}
          </div>
        </div>
      </div>
      <div className='margin-hack'></div>
    </Container>
  );
};

export default Footer;