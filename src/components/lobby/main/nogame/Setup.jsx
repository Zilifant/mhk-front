import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import TimerSetup from './TimerSetup';
import '../../../../styles/setup.css';

import { tooltip } from '../../../../util/utils';
import { parseSMDLines, renderStyledLines } from '../../../../util/styled-text';

const Setup = ({
  lobby,
  iAmLeader,
  gameSettings,
}) => {

  const { socket } = useContext(SocketContext);

  // const tttext = 'At least 5 players are needed to use the Witness and Accomplice roles (6 or more players are recommended). For the best experience, use both the Witness and the Accomplice, or neither.'

  const {
    startGameHandler,
    toggleHandler,
    chooseTimerHandler,
  } = useGame(socket);

  const advRoles = [
    {id: 'witness', active: gameSettings.hasWitness},
    {id: 'accomplice', active: gameSettings.hasAccomplice}
  ];

  const advRolesLeader = () => (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <Button
          key={i}
          className={`advrole ${role.active ? 'on' : 'off'}`}
          onClick={() => toggleHandler(role.id)}
          disabled={!lobby.canUseAdvRoles()}
        >
          {role.id}
        </Button>
      ))}
    </div>
  );

  const advRolesBasic = () => (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <div
          key={i}
          className={`advrole ${role.active ? 'on' : 'off'}`}
        >
          {role.id}
        </div>
      ))}
    </div>
  );

  return (
    <Container className={`setup ${iAmLeader ? 'leader' : 'notleader'}`}>

      {iAmLeader &&
      <div className='setup-section start'>
        <Button
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</Button>
      </div>}

      <div className='setup-section roles tooltip'>
        {iAmLeader ? advRolesLeader() : advRolesBasic()}
          {renderStyledLines(parseSMDLines({lines: tooltip.advRoles}), {wrapper: 'tooltiptext'})}
      </div>

      <div className='setup-section timer'>
        <TimerSetup
          iAmLeader={iAmLeader}
          gameSettings={gameSettings}
          chooseTimerHandler={chooseTimerHandler}
        />
      </div>

    </Container>
  );
};

export default Setup;
