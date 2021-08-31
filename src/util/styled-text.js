// styled text

import { GAME_OUTCOMES } from '../util/utils';

export function parseAndRender({type, time, args}, meta) {
  if (meta.parent === 'chatfeed') return renderStyledBlock(strings[type](time, ...args), meta);
  return renderStyledText(strings[type](time, ...args), meta);
};

function renderStyledText(elements, meta) {
  return (
    <div className={meta.wrapper || 'none'}>
      {elements.map((el, i) => {
        if (!meta.timestamp && i === 0) return null;
        return <span key={i} className={el.style}>{el.string}</span>
      })}
    </div>
  );
};

function renderStyledBlock(elements, meta) {

  const [style, content] = meta.isAnno
    ? [elements[0].style, elements[0].string]
    : [elements[0].style, elements[0].string];

  return (
    <div className={meta.wrapper || 'none'}>
      <div className={style}>{content}</div>
      <div className={'styled-block-text'}>
        {elements.map((el, i) => {
          if (i === 0) return null;
          return <span key={i} className={el.style}>{el.string}</span>
        })}
      </div>
    </div>
  );
};

function parseSMDString({str}, opts) {
  const defStyle = opts.default || 'default';
  const st = opts.splitTextOn || '^';
  const sc = opts.splitClsOn || '_';

  const createStyleObj = (string, style = defStyle) => {
    return { string, style }
  };

  const checkAbbr = (cls) => opts.abbr.find(e => e.abb === cls);

  const arr = str.split(st).filter(e => !!e);

  const result = arr.map(str => {

    if (str.charAt(0) !== sc) return createStyleObj(str);

    const a = str.split(sc).filter(e => !!e);

    let abbr;
    if (!!opts) abbr = checkAbbr(a[0]);
    if (!!abbr) return createStyleObj(a[1], abbr.classname);

    return createStyleObj(a[1], a[0]);
  });
  return result;
};

const SMDopts = {
  splitTextOn: '^',
  splitClsOn: '_',
  default: 'string',
  abbr: [
    {abb: 'm', classname: 'string--usermessage'},
    {abb: 't', classname: 'string--timestamp'},
    {abb: 'u', classname: 'string--username'},
    {abb: 'k', classname: 'string--keyword'},
    {abb: 'p', classname: 'string--punctuation'},
  ]
};

const parseSMD = ({str}) => parseSMDString({str}, SMDopts);

const name = (userId) => userId.slice(0,-5);

const cls = 'string--username '

const strings = (() => {

  const waitingForJoin = (time) => {
    const str = `_t_${time} ^Waiting for more players...`;
    return parseSMD({str});
  };

  const waitingForReady = (time) => {
    const str = `_t_${time} ^Waiting for everyone to be ready...`;
    return parseSMD({str});
  };

  const waitingForStart = (time, iAmLeader) => {
    let str;
    iAmLeader ? str = `_t_${time} ^Ready to start...` : str = `_t_${time} ^Waiting for the leader to start the game...`
    return parseSMD({str});
  };

  const welcome = (time) => {
    const str = `_t_${time} ^_m_Welcome to MHK.`;
    return parseSMD({str});
  };

  const userMessage = (time, [id, col], text) => {
    const str = `_t_${time} ^_${cls+col}_${name(id)}^_p_: ^_m_${text}`;
    return parseSMD({str});
  };

  const join = (time, [id, col]) => {
    const str = `_t_${time} ^_${cls+col}_${name(id)}^ joined.`;
    return parseSMD({str});
  };

  const leave = (time, [id, col], [leaderId, leaderCol]) => {
    let str;
    !!leaderId ? str = `_t_${time} ^_${cls+col}_${name(id)}^ left. ^_${cls+leaderCol}_${name(leaderId)}^ is the new leader.`
                : str = `_t_${time} ^_${cls+col}_${name(id)}^ left.`;
    return parseSMD({str});
  };

  const ready = (time, [id, col], ready) => {
    const str = `_t_${time} ^_${cls+col}_${name(id)}^ is ${ready ? 'ready' : 'not ready'}.`;
    return parseSMD({str});
  };

  const newLeader = (time, [id, col]) => {
    const str = `_t_${time} ^_${cls+col}_${name(id)}^ is the new leader.`;
    return parseSMD({str});
  };

  const accusation = (time, { accuser: [rId, rCol], accusee: [eId, eCol], evidence: [ev1, ev2] }) => {
    const str = `_t_${time} ^_${cls+rCol}_${name(rId)}^ accuses ^_${cls+eCol}_${name(eId)}^ with evidence: ^_k_${ev1}^ and ^_k_${ev2}^.`;
    return parseSMD({str});
  };

  const accusationWrong = (time, [id, col]) => {
    const str = `_t_${time} ^_${cls+col}_${name(id)}^ is wrong.`;
    return parseSMD({str});
  };

  const accusationRight = (time, [rId, rCol], [eId, eCol]) => {
    const str = `_t_${time} ^_${cls+rCol}_${name(rId)}^ is correct! ^_${cls+eCol}_${name(eId)}^ is the Killer.`;
    return parseSMD({str});
  };

  const advanceTo = (time, stage) => {
    let str;
    switch (stage.id) {
      case 'setup':
        str = `_t_${time} ^Game started. Waiting for the Killer to select key evidence...`;
        break;
      case 'round-1':
        str = `_t_${time} ^Key evidence chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-2-start':
        str = `_t_${time} ^Starting ^_k_${stage.display}^. Waiting for the Ghost to choose a new scene...`;
        break;
      case 'round-2':
        str = `_t_${time} ^New scene chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-3-start':
        str = `_t_${time} ^Starting ^_k_${stage.display}^. Waiting for the Ghost to choose a new scene...`;
        break;
      case 'round-3':
        str = `_t_${time} ^The Ghost has selected a new scene. ^_k_${stage.display}^ started.`;
        break;
      case 'second-murder':
        str = `_t_${time} ^The Killer has been identified. But they can still win if they identify the Witness...`;
        break;
      case 'game-over': // should never get called
        str = `${stage.display}`
        break;
      default: break;
    }
    return parseSMD({str});
  };

  const clearGame = (time) => {
    const str = `_t_${time} ^The lobby leader cleared the game.`;
    return parseSMD({str});
  };

  const clueChosen = (time, clue) => {
    const str = `_t_${time} ^Clue chosen: ^_k_${clue}^.`;
    return parseSMD({str});
  };

  const ghostAssigned = (time, [id, col], unAssign) => {
    let str;
    unAssign ? str = `_t_${time} ^Ghost unassigned.`
             : str = `_t_${time} ^_${cls+col}_${name(id)}^ is assigned to Ghost.`;
    return parseSMD({str});
  };

  const resolveGame = (time, result) => {
    const str = `_t_${time} ^_k_${GAME_OUTCOMES[result]}`;
    return parseSMD({str});
  };

  return {
    waitingForJoin, waitingForReady, waitingForStart,
    userMessage,
    welcome,
    join, leave, ready,
    ghostAssigned,
    newLeader,
    advanceTo,
    resolveGame, clearGame,
    clueChosen,
    accusation, accusationRight, accusationWrong
  };
})();