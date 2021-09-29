// Styled Markdown

// Styled Markdown

const userOpts = {
  active: false
};

const defaultOpts = {
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
  ],
};

const opts = userOpts.active ? userOpts : defaultOpts;

export function parse(str, meta = {}) {
  // console.log(str);
  if (!!meta.inlineOnly) return parseInline({str, meta});
  return parseBlock({str, meta});
}

function parseBlock({str, meta}) {
  // console.log(str);
  const lines = parseSMD({str, meta, isBlock: true});
  // console.log(lines);
  const block = lines.map(line => {
    return {
      strings: parseSMD({str: line.string, isBlock: false}),
      style: `line-${line.style}`
    };
  });
  return block;
}

function parseInline({str, meta}) {
  return parseSMD({str, meta, isBlock: false});
}

export const render = {

  block(lines, meta = {}) {

    if (meta.wrapper) return <div className={meta.wrapper}>{render(lines)}</div>;

    return <>{render(lines)}</>

    function render(lines) {
      return lines.map((li, i) => {
        return <div key={i} className={li.style}>{li.strings.map((str, i) => {
          return <span key={i} className={str.style}>{str.string}</span>
        })}</div>
      })
    }

  },

  inline(elements, meta = {}) {
    return <div className={meta?.wrapper}>{elements.map((el, i) => {
      return <span key={i} className={el.style}>{el.string}</span>
    })}</div>

  },

}

function parseSMD({str, isBlock}) {
  let defStyle, sS, sC;

  if (isBlock) {
    defStyle = opts.defaultLine;
    sS = opts.splitLineOn;
    sC = opts.splitLineClsOn;
  } else {
    defStyle = opts.defaultString;
    sS = opts.splitStrOn;
    sC = opts.splitStrClsOn;
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