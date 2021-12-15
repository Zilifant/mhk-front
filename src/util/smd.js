// Styled Markdown (SMD) //

// Uses a markdown-like syntax to convert strings to text into JSX. CSS classes
// can be applied 'inline', in the same way that e.g. *italic*, **bold**, or
// #header styles are applied using markdown.
// Features:
// - CSS classes can be applied to both inline and block level text.
// - Can render text as a series of block-level lines (i.e. paragraphs) or as
//   inline text.
// - Metadata can be passed in addition to text content to use additional
//   settings and functionality.
// - Can apply css classes based on shorthand defined in an options object
//   (recommended/intended usage) or named directly in the text content string.

// TO DO: Fully implement userOpts functionality.

const defaultOpts = {
  splitStringOn: '^',
  splitStringClassOn: '_',
  splitLineOn: '<',
  splitLineClassOn: '>',
  defaultStringClass: 'smd--def',
  defaultLineClass: 'smd--def',
  shorthandClassNames: [
    {shorthand: 'm', className: 'smd--usermessage'},
    {shorthand: 't', className: 'smd--timestamp'},
    {shorthand: 'u', className: 'smd--username'},
    {shorthand: 'k', className: 'smd--keyword'},
    {shorthand: 'p', className: 'smd--punctuation'},
    {shorthand: 'f', className: 'smd--faded'},
    {shorthand: 'e', className: 'smd--emphasize'},
    {shorthand: 'i', className: 'smd--italic'},
    {shorthand: 'w', className: 'smd--warn'},
  ],
};

// Custom User Options //
// Temporary, incomplete implementation.

const customOpts = {
  mergeShorthandClassNames: true,
  shorthandClassNames: [
    {shorthand: 'kg', className: 'smd--keyword ghost'},
    {shorthand: 'kh', className: 'smd--keyword hunter'},
    {shorthand: 'kw', className: 'smd--keyword witness'},
    {shorthand: 'ka', className: 'smd--keyword accomplice'},
    {shorthand: 'kk', className: 'smd--keyword killer'},
    {shorthand: 'li', className: 'smd--listitem'},
  ]
};

function setStyledMarkdownOpts(customOpts) {
  if (!customOpts) return defaultOpts;

  let opts = defaultOpts;

  if (customOpts.mergeShorthandClassNames) {
    const merged = opts.shorthandClassNames.concat(customOpts.shorthandClassNames);
    opts.shorthandClassNames = merged;
  } else {
    opts.shorthandClassNames = customOpts.shorthandClassNames;
  };

  return opts;
};

const opts = setStyledMarkdownOpts(customOpts);

export function parse(str, meta = {}) {
  if (!!meta.inlineOnly) return parseInline({str, meta});
  return parseBlock({str, meta});
}

function parseBlock({str, meta}) {
  const lines = parseSMD({str, meta, isBlock: true});
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
    defStyle = opts.defaultLineClass;
    sS = opts.splitLineOn;
    sC = opts.splitLineClassOn;
  } else {
    defStyle = opts.defaultStringClass;
    sS = opts.splitStringOn;
    sC = opts.splitStringClassOn;
  };

  function createStyleObj(string, style = defStyle) {
    return { string, style }
  };

  function checkAbbr(cls) {
    return opts.shorthandClassNames.find(e => e.shorthand === cls);
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

    let shorthandClassNames;
    // check for shorthandClassNames style class name in options object
    // if shorthandClassNames found, return string with full class name
    if (!!opts) shorthandClassNames = checkAbbr(a[0]);
    if (!!shorthandClassNames) return createStyleObj(a[1], shorthandClassNames.className);

    // return string with style class as given
    return createStyleObj(a[1], a[0]);
  });
  return result;
};