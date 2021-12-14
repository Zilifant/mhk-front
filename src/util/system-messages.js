// System Messages //

import { name } from '../util/utils';

export function buildSMDString(data, meta) {
  const { type, time, args } = data;
  const { renderTimestamp } = meta;
  const string = () => systemMessages[type](...args);

  if (renderTimestamp === 'block') return `>t>_t_${time} <>text-after-timestamp-block>` + string();
  if (renderTimestamp === 'inline') return `_t_${time} ^` + string();
  // If `renderTimestamp` is any other value, don't render it.
  return string();
};

// Functions called by `buildSMDString` to dynamically create system messages.
// Each returns a string in 'styled markdown' (SMD) format.
const systemMessages = (() => {

  const outcomes = {
    redwin: ({accuser}) =>
      `_${cls+accuser.color.id}_${accuser.userName}'s^ accusation is wrong. The ^_kh_Hunters^ used their last accusation. The ^_kk_Killer^ wins!`,

    redwin_accomplice: ({accuser}) =>
      `_${cls+accuser.color.id}_${accuser.userName}'s^ accusation is wrong. The ^_kh_Hunters^ used their last accusation. The ^_kk_Killer^ and the ^_ka_Accomplice^ win!`,

    redwintimeout: () =>
      `The ^_kk_Killer^ wins! The ^_kh_Hunters^ ran out of time.`,

    redwintimeout_accomplice: () =>
      `The ^_kk_Killer^ and the ^_ka_Accomplice^ win! The ^_kh_Hunters^ ran out of time.`,

    redwinwitnessdead: ({killer, witness}) =>
      `_${cls+killer.color.id}_${killer.userName}^ killed ^_${cls+witness.color.id}_${witness.userName}^. They were the ^_kw_Witness^! The ^_kk_Killer^ wins!`,

    redwinwitnessdead_accomplice: ({killer, witness, accomplice}) =>
      `_${cls+killer.color.id}_${killer.userName}^ and ^_${cls+accomplice.color.id}_${accomplice.userName}^ killed ^_${cls+witness.color.id}_${witness.userName}^. They were the ^_kw_Witness^! The ^_kk_Killer^ and ^_ka_Accomplice^ win!`,

    bluewin: ({accuser, killer}) =>
      `_${cls+accuser.color.id}_${accuser.userName}^ is correct. ^_${cls+killer.color.id}_${killer.userName}^ is the ^_kk_Killer^. The ^_kh_Hunters^ and the ^_kg_Ghost^ win!`,

    bluewinwitnessalive: ({killer, witness, target}) =>
      `_${cls+killer.color.id}_${killer.userName}^ killed ^_${cls+target.color.id}_${target.userName}^. But the ^_kw_Witness^ was ^_${cls+witness.color.id}_${witness.userName}^! The ^_kh_Hunters^ and the ^_kg_Ghost^ win!`
  };

  const cls = 'smd--username ';

  const duplicateConnection = () => `User connected in another window. This window will disconnect.`;

  const waitingForJoin = () => `Waiting for more players...`;

  const waitingForReady = () => `Waiting for everyone to be ready...`;

  const welcome = () => `Welcome to MHK.`;

  const clearGame = () => `Game cleared.`;

  const userMessage = ([id, col], text) => `_${cls+col}_${name(id)}^_p_: ^_m_${text}`;

  const clueChosen = (clue) => `Clue chosen: ^_k_${clue}^.`;

  const resolveGame = (result, args) => outcomes[result](args);

  const join = ([id, col]) => `_${cls+col}_${name(id)}^ joined.`;

  const waitingForStart = (iAmLeader, leader) => {
    return iAmLeader ? `Ready to start...` : `Waiting for ^_${cls+leader.color.id}_${name(leader.id)}^ to start the game...`
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
        str = `Starting ^_k_${stage.display}^. Waiting for the ^_kg_Ghost^ to replace a card...`;
        break;
      case 'round-2':
        str = `Clue card replaced. ^_k_${stage.display}^ started...`;
        break;
      case 'round-3-start':
        str = `Starting ^_k_${stage.display}^. Waiting for the ^_kg_Ghost^ to replace a clue card...`;
        break;
      case 'round-3':
        str = `Clue card replaced. ^_k_${stage.display}^ started...`;
        break;
      case 'second-murder':
        str = `The ^_kk_Killer^ has been identified. But they can still win if they can kill the ^_kw_Witness^...`;
        break;
      case 'game-over': // Should never be called.
        str = `${stage.display}`
        break;
      default: break;
    }
    return str;
  };

  return {
    duplicateConnection,
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