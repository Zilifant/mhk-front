// styled text

import { systemMessages } from "./system-messages";

const SMDopts = {
  splitStrOn: '^',
  splitStrClsOn: '_',
  splitLineOn: '<',
  splitLineClsOn: '>',
  defaultString: 'smd--def',
  defaultLine: 'smd--def',
  abbr: [
    {abb: 'm', classname: 'smd--usermessage'},
    {abb: 't', classname: 'smd--timestamp'},
    {abb: 'u', classname: 'smd--username'},
    {abb: 'k', classname: 'smd--keyword'},
    {abb: 'k', classname: 'smd--keyword'},
    {abb: 'kg', classname: 'smd--keyword ghost'},
    {abb: 'kh', classname: 'smd--keyword hunter'},
    {abb: 'kw', classname: 'smd--keyword witness'},
    {abb: 'ka', classname: 'smd--keyword accomplice'},
    {abb: 'kk', classname: 'smd--keyword killer'},
    {abb: 'p', classname: 'smd--punctuation'},
    {abb: 'f', classname: 'smd--faded'},
    {abb: 'e', classname: 'smd--emphasize'},
    {abb: 'i', classname: 'smd--italic'},
    {abb: 'w', classname: 'smd--warn'},
  ]
};

export function parseAndRender({type, time, args}, meta = {}) {
  const parsedStr = parseFromStrings({type: type, time: time, args: args});
  if (meta.parent === 'chatfeed') return renderStyledBlock(parsedStr, meta);
  return renderStyledString(parsedStr, meta);
};

export function parseSMDLines({lines}) {
  const plines = parseSMD({str: lines, multiLine: true});
  const splines = plines.map(line => {
    return {
      strings: parseSMD({str: line.string, multiLine: false}),
      style: `line-${line.style}`
    };
  });
  return splines;
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

const makeString = (msg, args) => systemMessages[msg](...args);

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
    defStyle = opts.defaultLine || 'smd-line--def';
    sS = opts.splitLineOn || '<';
    sC = opts.splitLineClsOn || '>';
  } else {
    defStyle = opts.defaultString || 'smd-def';
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
    // return string without unique class
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
