import React, {
  useContext
} from 'react';
import { SocketContext } from '../../context/contexts';
import { useGame } from '../../hooks/game-hook';
import Container from '../shared/Container';
import Tooltip from './Tooltip';
import SVGButton from '../ui-elements/SVGButton';
import '../../styles/footer.scss';

const Footer = ({
  showClearBtn
}) => {

  const { socket } = useContext(SocketContext);
  const { clearGameHandler } = useGame(socket);

  return (
    <Container className='foot'>
      <div className='footer-wrap'>
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
        <div className='footer-bar'>
          <div className='footer-text'>
            Copyright 2021 Zilifant
          </div>
        </div>
      </div>
      <div className='margin-hack'></div>
    </Container>
  );
};

export default Footer;