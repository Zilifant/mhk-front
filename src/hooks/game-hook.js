import {
  useState,
  // useEffect,
  // useContext,
  // useCallback
} from 'react';
// import { UserContext } from '../context/contexts';

export const useGame = (socket) => {
  const [game, setGame] = useState();
  const [gameOn, setGameOn] = useState(false);
  const [gameResult, setGameResult] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [leaderId, setLeaderId] = useState();
  const [canStart, setCanStart] = useState(false);
  const [gameSettings, setGameSettings] = useState();

  const subToGameSettings = () => {
    socket.current.on('gameSettingsUpdate',
      ({gameSettings}) => {
        setGameSettings(gameSettings);
      }
    );
  };

  const subToUserConnected = () => {
    socket.current.on('userConnected', ({ resData: {usersOnline} }) => {
      setOnlineUsers(usersOnline);
      setCanStart(false);
    });
  };

  const subToGhostAssigned = () => {
    socket.current.on('ghostAssigned', ({ resData: {usersOnline} }) => {
      setOnlineUsers(usersOnline);
    });
  };

  const subToReadyUnready = () => {
    socket.current.on('readyUnready', ({ resData: {usersOnline, canStart} }) => {
      setOnlineUsers(usersOnline);
      setCanStart(canStart);
    });
  };

  const subToUserDisco = () => {
    socket.current.on('userDisco', ({ resData: {usersOnline, newLeaderId} }) => {
      setOnlineUsers(usersOnline);
      if (newLeaderId) setLeaderId(newLeaderId);
    });
  };

  const subToStartGame = () => {
    socket.current.on('startGame', ({ game }) => {
      setGame(game);
      setGameOn(true);
    });
  };

  const subToAdvStage = () => {
    socket.current.on('advanceStage', ({ game }) => {
      setGame(game);
    });
  };

  const subToClueChosen = () => {
    socket.current.on('clueChosen', ({ game }) => {
      setGame(game);
    });
  };

  // const subToNewClueCardDrawn = () => {
  //   socket.current.on('newClueCardDrawn', ({ game }) => {
  //     setGame(game);
  //   });
  // };

  const subToWrongAccusation = () => {
    socket.current.on('wrongAccusation', ({ game }) => {
      setGame(game);
    });
  };

  const subToGameResolution = () => {
    socket.current.on('resolveGame', ({ game }) => {
      // console.log('resolveGame');
      setGame(game);
      setGameResult(game.result);
      // switch (game.result.type) {
      //   case 'red-win': redWin(game); break;
      //   case 'red-win-timeout': redWinTimeout(game); break;
      //   case 'red-win-witness_dead': redWinWitnessDead(game); break;
      //   case 'blue-win': endByLastRound(game); break;
      //   case 'blue-win-witness_alive': endByLastRound(game); break;
      //   default: clearGame(); break;
      // };
    });
  };

  const subToClearGame = () => {
    socket.current.on('clearGame', ({ resData: {usersOnline} }) => {
      setOnlineUsers(usersOnline);
      setCanStart(false);
      setGame(null);
      setGameOn(false);
    });
  };

  // function clearGame() {
  //   console.log('clearGame')
  // };

  const subToGame = () => {
    subToGameSettings();
    subToUserConnected();
    subToGhostAssigned();
    subToReadyUnready();
    subToUserDisco();
    subToStartGame();
    subToAdvStage();
    // subToNewClueCardDrawn();
    subToClueChosen();
    subToWrongAccusation();
    subToGameResolution();
    subToClearGame();
  };

  return {
    game, setGame,
    gameOn, setGameOn,
    gameSettings, setGameSettings,
    gameResult,
    subToGame,
    leaderId, setLeaderId,
    onlineUsers, canStart
  };
};

  // const [thisPlayer, setThisPlayer] = useState();

  // const getThisPlayer = useCallback((userId) => {
  //   return this.players.find(player => player.id === userId);
  // },[]);

  // const setGameWiMethods = (game) => {
  //   console.log('setGameWithMethods')
  //   setGame({...game, getThisPlayer});
  // };