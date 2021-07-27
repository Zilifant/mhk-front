import React, {
  // useState,
  // useEffect,
  useContext
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Grid from '../../shared/Grid';
import Info from './Info';
import MemberList from './nogame/MemberList';
import Setup from './nogame/Setup';
import Ghost from './game/Ghost';
import Players from './game/Players';
import GhostUI from './game/GhostUI';
import HunterUI from './game/HunterUI';
import KillerUI from './game/KIllerUI';

const Main = ({
  oUsers, canStart, gameOn, game, thisPlayer, gameResult, leaderId, iAmLeader
}) => {

  // console.log(thisPlayer);

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  // TO DO: restrict this to lobby leader
  const startGameHandler = () => {
    socket.current.emit('startGame', {settings: 'placeholder settings'});
  };

  // TO DO: restrict this to lobby leader
  const clearGameHandler = () => {
    socket.current.emit('clearGame');
  };

  const nextRoundHandler = () => {
    socket.current.emit('advanceStage');
  };

  const readyHandler = () => {
    socket.current.emit('readyUnready', { userId });
  };

  // console.log(game);

  return (
    <Container className='lobbymain' parentGrid='lobby'>
      <Grid className={gameOn ? 'main-game' : 'main-nogame'}>
        <Info
          startGameHandler={startGameHandler}
          nextRoundHandler={nextRoundHandler}
          clearGameHandler={clearGameHandler}
          canStart={canStart}
          gameOn={gameOn}
          roundNum={game && game.roundNum}
          stage={game && game.currentStage}
          leaderId={leaderId}
          prevGameResult={gameResult}
        />
        {!gameOn &&
          <React.Fragment>
            <Setup
              className='lobby'
              readyHandler={readyHandler}
              iAmLeader={iAmLeader}
            />
            <MemberList
              onlineUsers={oUsers}
              iAmLeader={iAmLeader}
            />
          </React.Fragment>
        }
        {gameOn && game && thisPlayer &&
          <React.Fragment>

            {thisPlayer.role !== 'Ghost' &&
            <Ghost
              ghost={game.ghost}
              ghostCards={game.cluesDeck}
              confirmedClues={game.confirmedClues}
            />}

            <Players
              stage={game.currentStage}
              players={game.players}
              myRole={thisPlayer.role}
              ghostId={game.ghost.id}
              keyEv={game.keyEvidence}
              canAccuse={!thisPlayer.accusalSpent}
            />

            {thisPlayer.role === 'Ghost' &&
            <GhostUI
              game={game}
              thisPlayer={thisPlayer}
            />}

            {thisPlayer.role === 'Hunter' &&
            <HunterUI
              thisPlayer={thisPlayer}
              stage={game.currentStage}
            />}

            {thisPlayer.role === 'Killer' &&
            <KillerUI
              thisPlayer={thisPlayer}
              stage={game.currentStage}
              keyEv={game.keyEvidence}
            />}

          </React.Fragment>
        }
      </Grid>
    </Container>
  );
};

export default Main;
