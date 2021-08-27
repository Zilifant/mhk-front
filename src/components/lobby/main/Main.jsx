import React, {
  // useState,
  // useEffect,
  // useContext
} from 'react';
import Info from './Info';
import MemberList from './nogame/MemberList';
import Setup from './nogame/Setup';
import Ghost from './game/Ghost';
import Players from './game/Players';
import BasicUI from './game/BasicUI';
import KillerUI from './game/KIllerUI';
import Announcer from './Announcer';
import Timer from './game/Timer';

const Main = ({
  lobby,
  thisPlayer,
  iAmLeader,
  lobby: {
    gameSettings,
    gameOn,
    game,
    chat,
  }
}) => {

  return (
    <>
      <Announcer
        chat={chat}
        iAmLeader={iAmLeader}
        lobby={lobby}
      />
      <Info
        canStart={lobby.canStart()}
        gameOn={gameOn}
        roundNum={game && game.roundNum}
        stage={game && game.currentStage}
        iAmLeader={iAmLeader}
      />
      {!gameOn && lobby &&
        <React.Fragment>
          <Setup
            iAmLeader={iAmLeader}
            gameSettings={gameSettings}
            lobby={lobby}
            canStart={lobby.canStart()}
            startGameText={lobby.startGameText(iAmLeader)}
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
            game={game}
          />}

          <Timer
            settings={game.settings.timer}
          />

          <Players
            game={game}
            myRole={thisPlayer.role}
            canIAccuse={thisPlayer.canAccuse}
          />

          {thisPlayer.role === 'ghost' &&
          <Ghost
            isGhostUI={true}
            game={game}
          />}

          {(thisPlayer.role === 'hunter' ||
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
    </>
  );
};

export default Main;
