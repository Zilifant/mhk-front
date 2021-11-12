import { useContext } from 'react';
import { SocketContext } from '../../context/contexts';
import { useGame } from '../../hooks/game-hook';
import { VERSION } from '../../util/utils';
import Container from '../shared/Container';
import Tooltip from './Tooltip';
import SVGButton from '../ui-elements/SVGButton';
import InfoModal from './InfoModal';
import RulesContent from '../content/RulesContent';
import AboutContent from '../content/AboutContent';
import '../../styles/footer.scss';

const Footer = ({ showClearBtn }) => {

  const { socket } = useContext(SocketContext);
  const { clearGameHandler } = useGame(socket);

  return (
    <Container className='foot'>
      <div className='footer-wrap'>
        <div className='footer-bar'>
          <InfoModal
            className='rules footer'
            btnClassName='flat'
            buttonContent='rulebook'
            titlebarContent='game rules'
            info={RulesContent}
          />
          <div className='footer-content'>
            <div className='footer-text'>v {VERSION}</div>
            <InfoModal
              className='about footer'
              btnClassName='flat'
              buttonContent='about'
              titlebarContent='about the app'
              info={AboutContent}
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