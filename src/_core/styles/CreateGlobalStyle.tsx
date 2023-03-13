import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  :root {
    --max-width: 1100px;
    --border-radius: 12px;

    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;

    --primary-glow: conic-gradient(from 180deg at 50% 50%,
    #16abff33 0deg,
    #0885ff33 55deg,
    #54d6ff33 120deg,
    #0071ff33 160deg,
    transparent 360deg);
    --secondary-glow: radial-gradient(rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0));

    --tile-start-rgb: 239, 245, 249;
    --tile-end-rgb: 228, 232, 233;
    --tile-border: conic-gradient(#00000080,
    #00000040,
    #00000030,
    #00000020,
    #00000010,
    #00000010,
    #00000080);

    --callout-rgb: 238, 240, 241;
    --callout-border-rgb: 172, 175, 176;
    --card-rgb: 180, 185, 188;
    --card-border-rgb: 131, 134, 135;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground-rgb: 255, 255, 255;
      --background-start-rgb: 0, 0, 0;
      --background-end-rgb: 0, 0, 0;

      --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
      --secondary-glow: linear-gradient(to bottom right,
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0.3));

      --tile-start-rgb: 2, 13, 46;
      --tile-end-rgb: 2, 5, 19;
      --tile-border: conic-gradient(#ffffff80,
      #ffffff40,
      #ffffff30,
      #ffffff20,
      #ffffff10,
      #ffffff10,
      #ffffff80);

      --callout-rgb: 20, 20, 20;
      --callout-border-rgb: 108, 108, 108;
      --card-rgb: 100, 100, 100;
      --card-border-rgb: 200, 200, 200;
    }
  }

  /*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

  /*
  Document
  ========
  */

  /**
  Use a better box model (opinionated).
  */

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  /**
  1. Correct the line height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size (opinionated).
  */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -moz-tab-size: 4; /* 3 */
    tab-size: 4; /* 3 */
  }

  /*
  Sections
  ========
  */

  /**
  1. Remove the margin in all browsers.
  2. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
  */

  body {
    margin: 0; /* 1 */
    font-family: "Trip Sans VF", "Trip Sans", Arial, sans-serif;
  }

  /*
  Grouping content
  ================
  */

  /**
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  */

  hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
  }

  /*
  Text-level semantics
  ====================
  */

  /**
  Add the correct text decoration in Chrome, Edge, and Safari.
  */

  abbr[title] {
    text-decoration: underline dotted;
  }

  /**
  Add the correct font weight in Edge and Safari.
  */

  b,
  strong {
    font-weight: bolder;
  }

  /**
  1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
  2. Correct the odd 'em' font sizing in all browsers.
  */

  code,
  kbd,
  samp,
  pre {
    font-family: ui-monospace,
    SFMono-Regular,
    Consolas,
    'Liberation Mono',
    Menlo,
    monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
  Add the correct font size in all browsers.
  */

  small {
    font-size: 80%;
  }

  /**
  Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
  */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /*
  Tabular data
  ============
  */

  /**
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  */

  table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */
  }

  /*
  Forms
  =====
  */

  /**
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
  Remove the inheritance of text transform in Edge and Firefox.
  */

  button,
  select {
    text-transform: none;
  }

  /**
  Correct the inability to style clickable types in iOS and Safari.
  */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
  Remove the inner border and padding in Firefox.
  */

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
  Restore the focus styles unset by the previous rule.
  */

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
  Remove the additional ':invalid' styles in Firefox.
  See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
  */

  :-moz-ui-invalid {
    box-shadow: none;
  }

  /**
  Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
  */

  legend {
    padding: 0;
  }

  /**
  Add the correct vertical alignment in Chrome and Firefox.
  */

  progress {
    vertical-align: baseline;
  }

  /**
  Correct the cursor style of increment and decrement buttons in Safari.
  */

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  /**
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
  */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
  Remove the inner padding in Chrome and Safari on macOS.
  */

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to 'inherit' in Safari.
  */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /*
  Interactive
  ===========
  */

  /*
  Add the correct display in Chrome and Safari.
  */

  summary {
    display: list-item;
  }


`