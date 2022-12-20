// Main //
// Wraps everything in the lobby except Chat.
// TO DO: Remove redundant checks for lobby and game data.

import React from 'react';
import Info from './Info';
import MemberList from './no-game/MemberList';
import Setup from './no-game/Setup';
import Ghost from './game/Ghost';
import Players from './game/Players';
import Announcer from './Announcer';
import Timer from './game/Timer';
import PlayerUI from './game/PlayerUI';

const Main = ({
  lobby,
  thisPlayer,
  iAmLeader,
  lobby: { isDemo, gameSettings, gameOn, game, chat },
}) => {
  const hidePlayerUI =
    thisPlayer?.role === 'ghost' || thisPlayer?.role === 'spectator';

  return (
    <>
      <Announcer
        isDemo={isDemo}
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

      {/* If there is no game... */}
      {!gameOn && lobby && (
        <React.Fragment>
          <Setup
            iAmLeader={iAmLeader}
            gameSettings={gameSettings}
            lobby={lobby}
            canStart={lobby.canStart()}
            startGameText={lobby.startGameText(iAmLeader)}
          />
          <MemberList users={lobby.users} iAmLeader={iAmLeader} />
        </React.Fragment>
      )}

      {/* If there is a game and player data is loaded... */}
      {gameOn && game && thisPlayer && (
        <React.Fragment>
          {thisPlayer.role !== 'ghost' && <Ghost game={game} />}

          <Timer
            timerSettings={gameSettings.timer}
            timerIsRunning={game.timerIsRunning}
          />

          <Players game={game} thisPlayer={thisPlayer} />

          {thisPlayer.role === 'ghost' && (
            <Ghost isGhostUI={true} game={game} />
          )}

          {!hidePlayerUI && (
            <PlayerUI
              thisPlayer={thisPlayer}
              stage={game.currentStage}
              keyEv={game?.keyEvidence}
            />
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default Main;
