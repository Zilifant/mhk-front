// system messages

import { name } from '../util/utils';

export function buildSMDString(data, meta) {
  const { type, time, args } = data
  const { timestamp } = meta
  const string = () => systemMessages[type](...args)

  if (timestamp === 'block') return `>t>_t_${time} <>text-after-timestamp-block>` + string()
  if (timestamp === 'inline') return `_t_${time} ^` + string()
  return string()
}

export const systemMessages = (() => {

  const GAME_OUTCOMES = {
    redwin: 'The ^_kk_Killer^ wins! The ^_kh_Hunters^ used their last accusation.',
    redwin_accomplice: 'The ^_kk_Killer^ and the ^_ka_Accomplice^ win! The ^_kh_Hunters^ used their last accusation.',
    redwintimeout: 'The ^_kk_Killer^ wins! The ^_kh_Hunters^ ran out of time.',
    redwintimeout_accomplice: 'The ^_kk_Killer^ and the ^_ka_Accomplice^ win! The ^_kh_Hunters^ ran out of time.',
    redwinwitnessdead: 'The ^_kk_Killer^ wins! The Witness is dead.',
    redwinwitnessdead_accomplice: 'The ^_kk_Killer^ and the ^_ka_Accomplice^ win! The ^_kw_Witness^ is dead.',
    bluewin: 'The ^_kh_Hunters^ and the ^_kg_Ghost^ win!',
    bluewinwitnessalive: 'The ^_kh_Hunters^ and the ^_kg_Ghost^ win! The ^_kw_Witness^ survived.'
  };

  const cls = 'smd--username '

  const waitingForJoin = () => `Waiting for more players...`;

  const waitingForReady = () => `Waiting for everyone to be ready...`;

  const welcome = () => `_m_Welcome to MHK.`;

  const clearGame = () => `Game cleared.`;

  const userMessage = ([id, col], text) => `_${cls+col}_${name(id)}^_p_: ^_m_${text}`;

  const clueChosen = (clue) => `Clue chosen: ^_k_${clue}^.`;

  const resolveGame = (result) => `_m_${GAME_OUTCOMES[result]}`;

  const join = ([id, col]) => `_${cls+col}_${name(id)}^ joined.`;

  const waitingForStart = (iAmLeader) => {
    return iAmLeader ? `Ready to start...` : `Waiting for the leader to start the game...`
  };

  const ready = ([id, col], ready) => {
    return `_${cls+col}_${name(id)}^ is ${ready ? 'ready' : 'not ready'}.`;
  };

  const newLeader = ([id, col]) => {
    return `_${cls+col}_${name(id)}^ is the new leader.`;
  };

  const accusation = ({ accuser: [rId, rCol], accusee: [eId, eCol], evidence: [ev1, ev2] }) => {
    return `_${cls+rCol}_${name(rId)}^ accuses ^_${cls+eCol}_${name(eId)}^ with evidence: ^_k_${ev1}^ and ^_k_${ev2}^.`;
  };

  const accusationWrong = ([id, col]) => {
    return `_${cls+col}_${name(id)}'s^ accusation is wrong. The round continues...`;
  };

  const accusationRight = ([rId, rCol], [eId, eCol]) => {
    return `_${cls+rCol}_${name(rId)}^ is correct! ^_${cls+eCol}_${name(eId)}^ is the ^_kk_Killer^.`;
  };

  const ghostAssigned = ([id, col], unAssign) => {
    return unAssign ? `_kg_Ghost^ unassigned.` : `_${cls+col}_${name(id)}^ is assigned to ^_kg_Ghost^.`;
  };

  const leave = ([id, col], [leaderId, leaderCol]) => {
    const leaderStr = !!leaderId ?  ` ^_${cls+leaderCol}_${name(leaderId)}^ is the new leader.` : '';
    return `_${cls+col}_${name(id)}^ left.${leaderStr}`;
  };

  const advanceTo = (stage) => {
    let str;
    switch (stage.id) {
      case 'setup':
        str = `Game started. Waiting for the ^_kk_Killer^ to select key evidence...`;
        break;
      case 'round-1':
        str = `Key evidence chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-2-start':
        str = `Starting ^_k_${stage.display}^. Waiting for the ^_kg_Ghost^ to choose a new scene...`;
        break;
      case 'round-2':
        str = `New scene chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-3-start':
        str = `Starting ^_k_${stage.display}^. Waiting for the ^_kg_Ghost^ to choose a new scene...`;
        break;
      case 'round-3':
        str = `The ^_kg_Ghost^ has selected a new scene. ^_k_${stage.display}^ started...`;
        break;
      case 'second-murder':
        str = `The ^_kk_Killer^ has been identified. But they can still win if they identify the ^_kw_Witness^...`;
        break;
      case 'game-over': // should never get called
        str = `${stage.display}`
        break;
      default: break;
    }
    return str;
  };

  return {
    waitingForJoin,
    waitingForReady,
    waitingForStart,
    userMessage,
    welcome,
    join,
    leave,
    ready,
    ghostAssigned,
    newLeader,
    advanceTo,
    resolveGame,
    clearGame,
    clueChosen,
    accusation,
    accusationRight,
    accusationWrong
  };
})();