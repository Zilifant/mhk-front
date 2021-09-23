import React from 'react';
import Container from '../../../shared/Container';
import GhostCard from './GhostCard';
// import { GiDeathSkull } from 'react-icons/gi';
import '../../../../styles/ghost.scss';
import SVGIcon from '../../../ui-elements/SVGIcon';

const Ghost = ({
  isGhostUI,
  game: {
    confirmedClues,
    cluesDeck,
    currentStage
  }
}) => {

  const ghostCardBack = () => (
    <div className='card-wrap--ghost back'>
      <div className='gc-back'>
        <div className='gc-back-wrap'>
          <SVGIcon
            icon='skull'
          />
          {/* <GiDeathSkull className='gc-back-icon' /> */}
          <div className='gc-back-text'>MHK</div>
        </div>
      </div>
      {isGhostUI && <div className='gc-conbtn-placeholder'>-</div>}
    </div>
  )

  return (
    <Container className={isGhostUI ? 'self gh' : 'ghost'}>
      <ul className='c-group'>
        {cluesDeck.map((card) => (
        <GhostCard
          key={card.id}
          card={card}
          stage={currentStage}
          isMine={isGhostUI}
          confirmedClues={confirmedClues}
        />))}
        {currentStage.type !== 'liminal' && ghostCardBack()}
      </ul>
    </Container>
  );
};

export default Ghost;
