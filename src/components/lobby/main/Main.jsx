import React, {
  // useState,
  // useEffect,
  // useContext
} from 'react';
// import { UserContext, SocketContext } from '../../../context/contexts';
// import { useGame } from '../../../hooks/game-hook';
// import { getThisPlayer } from '../../../util/utils';
import Container from '../../shared/Container';
import Grid from '../../shared/Grid';
import Info from './Info';
import MemberList from './nogame/MemberList';
import Setup from './nogame/Setup';
import Ghost from './game/Ghost';
import Players from './game/Players';
import GhostUI from './game/GhostUI';
import BasicUI from './game/BasicUI';
import KillerUI from './game/KIllerUI';
import Announcer from './Announcer';

const Main = ({
  lobby,
  gameOn,
  game,
  thisPlayer,
  iAmLeader,
  gameSettings,
  chat
}) => {

  // const oUsers = !!lobby.onlineUsers ? lobby.onlineUsers() : [];

  return (
    <Container className='lobbymain' parentGrid='lobby'>
      <Grid className={gameOn ? 'main-game' : 'main-nogame'}>
        <Announcer chat={chat} />
        <Info
          lobby={lobby}
          canStart={lobby.canStart()}
          gameOn={gameOn}
          roundNum={game && game.roundNum}
          stage={game && game.currentStage}
          iAmLeader={iAmLeader}
        />
        {!gameOn && lobby &&
          <React.Fragment>
            <Setup
              className='lobby'
              iAmLeader={iAmLeader}
              gameSettings={gameSettings}
            />
            <MemberList
              users={lobby.users}
              iAmLeader={iAmLeader}
            />
          </React.Fragment>
        }
        {gameOn && game && thisPlayer &&
          <React.Fragment>

            {thisPlayer.role !== 'ghost' &&
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
              redTeam={game.redTeam}
              keyEv={game.keyEvidence}
              canAccuse={!thisPlayer.accusalSpent}
              rolesRef={game.rolesRef}
            />

            {thisPlayer.role === 'ghost' &&
            <GhostUI
              game={game}
              thisPlayer={thisPlayer}
            />}

            {(thisPlayer.role === 'hunter'||
              thisPlayer.role === 'witness' ||
              thisPlayer.role === 'accomplice') &&
            <BasicUI
              thisPlayer={thisPlayer}
            />}

            {thisPlayer.role === 'killer' &&
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
