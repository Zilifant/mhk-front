// import {
//   // useState,
//   // useEffect,
//   // useContext,
//   // useCallback
// } from 'react';
// import { SocketContext } from '../context/contexts';

export const useGame = (socket) => {

  // const { socket } = useContext(SocketContext);
  // const [lobby, setLobby] = useState();
  // const [game, setGame] = useState();
  // const [gameOn, setGameOn] = useState(false);
  // const [users, setOnlineUsers] = useState([]);
  // const [leaderId, setLeaderId] = useState();
  // const [canStart, setCanStart] = useState(false);
  // const [gameSettings, setGameSettings] = useState();

  // const lobbyLoaded = !!lobby
  // console.log(`lobbyLoaded: ${lobbyLoaded}`)

  // handlers //////////////////////////////

  const startGameHandler = () => {
    return socket.current.emit('startGame', {settings: 'placeholder'});
    // return console.log('Error: only leader can start game');
  };

  const clearGameHandler = () => {
    return socket.current.emit('clearGame');
    // return console.log('Error: only leader can clear game');
  };

  const nextRoundHandler = () => {
    return socket.current.emit('advanceStage');
    // return console.log('Error: only leader can advance round');
  };

  const readyHandler = (userId) => {
    socket.current.emit('readyUnready', { userId });
  };

  const toggleHandler = (toggledItem) => {
    socket.current.emit('toggle', toggledItem);
  };

  const assignGhostHandler = (userId) => {
    socket.current.emit('ghostAssigned', userId);
  };

  const chooseKeyEvHandler = (keyEv) => {
    socket.current.emit('keyEvidenceChosen', keyEv);
  };

  const accusationHandler = (accusalEv, accusedId) => {
    const accusation = {
      accuserSID: socket.current.id,
      accusedId,
      accusalEv
    };
    socket.current.emit('accusation', accusation);
  };

  const killWitnessHandler = (targetId) => {
    socket.current.emit('secondMurder', targetId);
  };

  const chooseClueHandler = (clue) => {
    socket.current.emit('clueChosen', clue);
  };

  const replaceGhostCardHandler = (cardId) => {
    socket.current.emit('advanceStage', cardId);
  };

  // lobby subs //////////////////////////////

  // const subToGameSettings = () => {
  //   socket.current.on('gameSettingsUpdate', ({gameSettings}) => {
  //     setGameSettings(gameSettings);
  //   });
  // };

  // const subToUserConnected = () => {
  //   socket.current.on('userConnected', ({ resData: {users} }) => {
  //     setLobby({
  //       ...lobby,
  //       canStart: false,
  //       users: users
  //     });
  //   });
  // };

  // const subToGhostAssigned = () => {
  //   socket.current.on('ghostAssigned', ({ resData: {users} }) => {
  //     setLobby({
  //       ...lobby,
  //       users: users
  //     });
  //   });
  // };

  // const subToReadyUnready = () => {
  //   socket.current.on('readyUnready', ({ resData: {users, canStart} }) => {
  //     setLobby({
  //       ...lobby,
  //       canStart: canStart,
  //       users: users
  //     });
  //   });
  // };

  // const subToUserDisco = () => {
  //   socket.current.on('userDisco', ({ resData: {users, newLeaderId} }) => {

  //     const newLeader = () => {
  //       setLobby({
  //         ...lobby,
  //         users: users,
  //         leader: newLeaderId
  //       });
  //     };

  //     const noNewLeader = () => {
  //       setLobby({
  //         ...lobby,
  //         users: users
  //       });
  //     };

  //     return newLeaderId ? newLeader : noNewLeader;
  //   });
  // };

  // // game subs //////////////////////////////

  // const subToStartGame = () => {
  //   socket.current.on('startGame', ({ game }) => {
  //     setGame(game);
  //     setGameOn(true);
  //   });
  // };

  // const subToAdvStage = () => {
  //   socket.current.on('advanceStage', ({ game }) => {
  //     setGame(game);
  //   });
  // };

  // const subToClueChosen = () => {
  //   socket.current.on('clueChosen', ({ game }) => {
  //     setGame(game);
  //   });
  // };

  // const subToWrongAccusation = () => {
  //   socket.current.on('wrongAccusation', ({ game }) => {
  //     setGame(game);
  //   });
  // };

  // const subToGameResolution = () => {
  //   socket.current.on('resolveGame', ({ game }) => {
  //     setGame(game);
  //   });
  // };

  // const subToClearGame = () => {
  //   socket.current.on('clearGame', ({ resData: {users} }) => {
  //     // setOnlineUsers(users);
  //     // setCanStart(false);
  //     setGame(null);
  //     setGameOn(false);
  //   });
  // };

  // const subToGame = useCallback(() => {
  //   console.log('%csubToGame','color:#79f98e');
  //   subToGameSettings();
  //   subToUserConnected();
  //   subToGhostAssigned();
  //   subToReadyUnready();
  //   subToUserDisco();
  //   subToStartGame();
  //   subToAdvStage();
  //   subToClueChosen();
  //   subToWrongAccusation();
  //   subToGameResolution();
  //   subToClearGame();
  // }, []);

  return {
    // subToGame,
    // lobby,
    // setLobby,
    // game,
    // setGame,
    // gameOn,
    // setGameOn,
    // gameSettings,
    // setGameSettings,

    startGameHandler,
    clearGameHandler,
    nextRoundHandler,
    readyHandler,
    toggleHandler,
    assignGhostHandler,
    chooseKeyEvHandler,
    accusationHandler,
    killWitnessHandler,
    chooseClueHandler,
    replaceGhostCardHandler,
  };
};

// if (!lobby) return console.log(`Err: lobby = ${lobby}`);

  // function clearGame() {
  //   console.log('clearGame')
  // };

      // switch (game.result.type) {
      //   case 'red-win': redWin(game); break;
      //   case 'red-win-timeout': redWinTimeout(game); break;
      //   case 'red-win-witness_dead': redWinWitnessDead(game); break;
      //   case 'blue-win': endByLastRound(game); break;
      //   case 'blue-win-witness_alive': endByLastRound(game); break;
      //   default: clearGame(); break;
      // };

  // const [thisPlayer, setThisPlayer] = useState();

  // const getThisPlayer = useCallback((userId) => {
  //   return this.players.find(player => player.id === userId);
  // },[]);

  // const setGameWiMethods = (game) => {
  //   console.log('setGameWithMethods')
  //   setGame({...game, getThisPlayer});
  // };