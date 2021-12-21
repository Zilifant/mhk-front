// Styled Markdown (SMD) //

// Uses a markdown-like syntax to convert strings to text into JSX. CSS classes
// can be applied 'inline', in the same way that e.g. *italic*, **bold**, or
// #header styles are applied using markdown.

// Exports `parse` and `render`.

// Features:
// - CSS classes can be applied to both inline and block level text.
// - Can render text as a series of block-level lines (i.e. paragraphs) or as
//   inline text.
// - Metadata can be passed in addition to text content to use additional
//   settings and functionality.
//   Current Metadata Options:
//   - `inlineOnly`
//   - `wrapper`
// - Can apply css classes based on shorthand defined in an options object
//   (recommended/intended usage) or named directly in the text content string.

// TO DO: Fully implement userOpts functionality.
// TO DO: Improve/expand documentation.

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

// Parse //

// Takes a string with SMD syntax and (optionally) a metadata object.
// Returns array of 'style objects' that each contain a `string` and `style`
// property.
// - Each object is a section of the string that should be rendered as an
//   element with a specific css class.
// - Order of objects in array is the order in which they will be displayed.

export function parse(str, meta = {}) {
  if (!!meta.inlineOnly) return parseInline({str, meta});
  return parseBlock({str, meta});
};

function parseBlock({str, meta}) {
  const lines = parseSMD({str, meta, isBlock: true});
  const block = lines.map(line => {
    return {
      strings: parseSMD({str: line.string, isBlock: false}),
      style: `line-${line.style}`
    };
  });
  return block;
};

function parseInline({str, meta}) {
  return parseSMD({str, meta, isBlock: false});
};

function parseSMD({str, isBlock}) {

  // Utility Functions //

  function createStyleObj(string, style = defStyle) {
    return { string, style }
  };

  function checkShorthand(cls) {
    return opts.shorthandClassNames.find(e => e.shorthand === cls);
  };

  // Parsing Logic //

  // Set variables to correct characters to parse at block or inline level.
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

  // Split into array of strings and filter out empty strings.
  const arr = str.split(sS).filter(e => !!e);

  // Split each string into text content and css class.
  const styleObjArray = arr.map(str => {

    // If appropriate character is not found (i.e. no unique css class was
    // given) create and return object without a unique class. (Default css
    // class will be applied by `createStyleObj`.)
    if (str.charAt(0) !== sC) return createStyleObj(str);

    // Else, split into css class and text content and filter empty strings.
    const a = str.split(sC).filter(e => !!e);
    const textContent = a[1];
    const cssClass = a[0];

    // Check if given css class appears as a shorthand in the options object.
    // If so, create and return object with the full class name.
    const shorthand = checkShorthand(cssClass);
    if (!!shorthand) {
      return createStyleObj(textContent, shorthand.className);
    };

    // Else, create and return object with css class as given.
    return createStyleObj(textContent, cssClass);
  });

  return styleObjArray;
};

// Render //

// Unlike `parse`, `render` is an object with methods.
// Takes an array on 'style objects' generated by `parse`, and (optionally) a
// metadata object. Returns JSX.

export const render = {

  block(lines, meta = {}) {

    if (meta.wrapper) return (
      <div className={meta.wrapper}>
        {renderLines(lines)}
      </div>
    );

    return <>{renderLines(lines)}</> // If no wrapper, return a React fragment.

    function renderLines(lines) {
      return lines.map((li, i) => {
        return <div key={i} className={li.style}>{li.strings.map((str, i) => {
          return <span key={i} className={str.style}>{str.string}</span>
        })}</div>
      })
    };

  },

  inline(elements, meta = {}) {
    return <div className={meta?.wrapper}>{elements.map((el, i) => {
      return <span key={i} className={el.style}>{el.string}</span>
    })}</div>

  },

};