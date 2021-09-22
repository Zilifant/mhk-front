// styled text

import { GAME_OUTCOMES, name } from '../util/utils';

export function parseAndRender({type, time, args}, meta = {}) {
  const parsedStr = parseFromStrings({type: type, time: time, args: args});
  if (meta.parent === 'chatfeed') return renderStyledBlock(parsedStr, meta);
  return renderStyledString(parsedStr, meta);
};

const makeString = (type, args) => strings[type](...args);

const prependTime = (string, time) => `_t_${time} ^` + string;

function parseFromStrings({type, time, args}) {
  const str = makeString(type, args);
  const strTime = prependTime(str, time);
  return parseSMD({str: strTime, multiLine: false});
}

function renderStyledString(elements, meta = {}) {
  return (
    <div className={meta.wrapper || 'none'}>
      {elements.map((el, i) => {
        if (!meta.timestamp && i === 0) return null;
        return <span key={i} className={el.style}>{el.string}</span>
      })}
    </div>
  );
};

export function renderStyledLines(lines, meta = {}) {

  if (meta.wrapper) return (
    <div className={meta.wrapper}>
      {render(lines)}
    </div>
  );

  return (<>{render(lines)}</>)

  function render(lines) {
    return lines.map((li, i) => {
      return (
        <div key={i} className={li.style}>
        {li.strings.map((str, i) => {
          return (
            <span key={i} className={str.style}>
              {str.string}
            </span>
          );
        })}
        </div>
      );
    });
  };
};

function renderStyledBlock(elements, meta = {}) {

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

function parseSMD({str, opts = SMDopts, multiLine}) {
  let defStyle, sS, sC;

  if (multiLine) {
    defStyle = opts.defaultLine || 'default';
    sS = opts.splitLineOn || '<';
    sC = opts.splitLineClsOn || '>';
  } else {
    defStyle = opts.defaultString || 'default';
    sS = opts.splitStrOn || '^';
    sC = opts.splitStrClsOn || '_';
  };

  function createStyleObj(string, style = defStyle) {
    return { string, style }
  };

  function checkAbbr(cls) {
    return opts.abbr.find(e => e.abb === cls);
  };

  // split into substrings and filter out empty strings
  const arr = str.split(sS).filter(e => !!e);

  const result = arr.map(str => {

    // if no unique style class is indicated
    // and return string without unique class
    // (default style class will be applied)
    if (str.charAt(0) !== sC) return createStyleObj(str);

    // split string into style class and text content
    // and filter out empty strings
    const a = str.split(sC).filter(e => !!e);

    let abbr;
    // check for abbr style class name in options object
    // if abbr found, return string with full class name
    if (!!opts) abbr = checkAbbr(a[0]);
    if (!!abbr) return createStyleObj(a[1], abbr.classname);

    // return string with style class as given
    return createStyleObj(a[1], a[0]);
  });
  return result;
};

const SMDopts = {
  splitStrOn: '^',
  splitStrClsOn: '_',
  splitLineOn: '<',
  splitLineClsOn: '>',
  defaultString: 'string',
  defaultLine: 'line',
  abbr: [
    {abb: 'm', classname: 'string--usermessage'},
    {abb: 't', classname: 'string--timestamp'},
    {abb: 'u', classname: 'string--username'},
    {abb: 'k', classname: 'string--keyword'},
    {abb: 'p', classname: 'string--punctuation'},
    {abb: 'f', classname: 'faded'},
    {abb: 'e', classname: 'emphasize'},
  ]
};

export function parseSMDLines({lines}) {
  const plines = parseSMD({str: lines, multiLine: true});
  const splines = plines.map(line => {
    return {
      strings: parseSMD({str: line.string, multiLine: false}),
      style: line.style
    };
  });
  return splines;
};

const strings = (() => {

  const cls = 'string--username '

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
    return `_${cls+rCol}_${name(rId)}^ is correct! ^_${cls+eCol}_${name(eId)}^ is the Killer.`;
  };

  const ghostAssigned = ([id, col], unAssign) => {
    return unAssign ? `Ghost unassigned.` : `_${cls+col}_${name(id)}^ is assigned to Ghost.`;
  };

  const leave = ([id, col], [leaderId, leaderCol]) => {
    const leaderStr = !!leaderId ?  ` ^_${cls+leaderCol}_${name(leaderId)}^ is the new leader.` : '';
    return `_${cls+col}_${name(id)}^ left.${leaderStr}`;
  };

  const advanceTo = (stage) => {
    let str;
    switch (stage.id) {
      case 'setup':
        str = `Game started. Waiting for the Killer to select key evidence...`;
        break;
      case 'round-1':
        str = `Key evidence chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-2-start':
        str = `Starting ^_k_${stage.display}^. Waiting for the Ghost to choose a new scene...`;
        break;
      case 'round-2':
        str = `New scene chosen. ^_k_${stage.display}^ started...`;
        break;
      case 'round-3-start':
        str = `Starting ^_k_${stage.display}^. Waiting for the Ghost to choose a new scene...`;
        break;
      case 'round-3':
        str = `The Ghost has selected a new scene. ^_k_${stage.display}^ started...`;
        break;
      case 'second-murder':
        str = `The Killer has been identified. But they can still win if they identify the Witness...`;
        break;
      case 'game-over': // should never get called
        str = `${stage.display}`
        break;
      default: break;
    }
    return str;
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
