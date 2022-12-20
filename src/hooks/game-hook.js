// Game Hook //
// Provides socket.io emit functions.
// TO DO: Break this out into separate files and/or rename, since this includes
// functions used outside of games.

import { useContext } from 'react';
import { SocketContext } from '../context/contexts';

export const useGame = () => {
  const { socket } = useContext(SocketContext);

  const startGameHandler = () => {
    return socket.current.emit('startGame');
  };

  const clearGameHandler = () => {
    return socket.current.emit('clearGame');
  };

  const nextRoundHandler = () => {
    return socket.current.emit('advanceStage');
  };

  const readyHandler = (userId) => {
    socket.current.emit('readyUnready', userId);
  };

  const toggleHandler = (toggledItem) => {
    socket.current.emit('toggle', toggledItem);
  };

  const chooseTimerHandler = (duration) => {
    socket.current.emit('chooseTimer', duration);
  };

  const assignGhostHandler = (userId) => {
    socket.current.emit('ghostAssigned', userId);
  };

  const chooseKeyEvHandler = (keyEv) => {
    socket.current.emit('keyEvidenceChosen', keyEv);
  };

  const accusationHandler = (accusalEv, accuserId, accusedId) => {
    const accusation = { accusalEv, accuserId, accusedId };
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

  const giveLeaderHandler = (newLeaderId) => {
    socket.current.emit('giveLeadership', newLeaderId);
  };

  return {
    startGameHandler,
    clearGameHandler,
    nextRoundHandler,
    readyHandler,
    toggleHandler,
    chooseTimerHandler,
    assignGhostHandler,
    chooseKeyEvHandler,
    accusationHandler,
    killWitnessHandler,
    chooseClueHandler,
    replaceGhostCardHandler,
    giveLeaderHandler,
  };
};
