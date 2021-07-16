import {
  // useRef,
  // useEffect,
  useState,
  // useContext,
  // useCallback
} from 'react';
// import { UserContext } from '../context/contexts';

export const useGameIO = (socket) => {
  // console.log('Hook: useGameIO');

  // const { socket } = useContext(SocketContext);
  // const { userId } = useContext(UserContext);

  const [game, setGame] = useState();
  const [gameOn, setGameOn] = useState(false);
  const [gameResult, setGameResult] = useState();
  // const [thisPlayer, setThisPlayer] = useState();

  // const getThisPlayer = useCallback((userId) => {
  //   return this.players.find(player => player.id === userId);
  // },[]);

  // const setGameWiMethods = (game) => {
  //   console.log('setGameWithMethods')
  //   setGame({...game, getThisPlayer});
  // };

  const subToStartGame = () => {
    socket.current.on('startGame', ({ game }) => {
      // setGameWiMethods(game);
      setGame(game);
      setGameOn(true);
      // setThisPlayer(game.players.find(player => player.id === userId));
    });
  };

  const subToAdvStage = () => {
    socket.current.on('advanceStage', ({ game }) => {
      setGame(game);
      // setGameWiMethods(game);
    });
  };

  const subToKeyEvChosen = () => {
    socket.current.on('keyEvidenceChosen', ({ game }) => {
      setGame(game);
      // setGameWiMethods(game);
    });
  };

  const subToClueChosen = () => {
    socket.current.on('clueChosen', ({ game }) => {
      setGame(game);
      // setGameWiMethods(game);
    });
  };

  const subToWrongAccusation = () => {
    socket.current.on('wrongAccusation', ({ game }) => {
      setGame(game);
      // setGameWiMethods(game);
    });
  };

  const clearGame = () => {
    setGame(null);
    setGameOn(false);
    // setThisPlayer(null);
  };

  const endByAccusation = ({accuserId, killerId, keyEv}) => {
    clearGame();
    setGameResult({
      killerWin: false,
      accuserId,
      killerId,
      keyEv
    });
  };

  const endByLastRound = ({killerId, keyEv}) => {
    clearGame();
    setGameResult({
      killerWin: true,
      killerId,
      keyEv
    });
  };

  const subToGameEnd = () => {
    socket.current.on('gameEnd', (data) => {
      switch (data.cause) {
        case 'accusation': endByAccusation(data); break;
        case 'lastRound': endByLastRound(data); break;
        default: clearGame(); break;
      };
    });
  };

  const subToGame = () => {
    subToStartGame();
    subToGameEnd();
    subToAdvStage();
    subToKeyEvChosen();
    subToClueChosen();
    subToWrongAccusation();
  };

  return {
    // getThisPlayer,
    game, setGame,
    // setGameWiMethods,
    gameOn, setGameOn,
    gameResult,
    // thisPlayer, setThisPlayer,
    subToGame
  };
};