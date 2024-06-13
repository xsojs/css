# @xso/css

XSO has your own CSS abstraction, is like StyleX, but more simple to use and dynamic, and supports LESS and SASS/SCSS hierarchy structures-like.

> XSO CSS works like StyleX but supports LESS and SASS/SCSS logic structures.

This pure JavaScript framework brings a new way to build your CSS, in a much more practical way, less verbose, without limitations, and with **no compilations**.

All CSS is generated on run-time and injected into `<style>`s in the HTML.

The style sheet is implemented in fully raw JavaScript Objects.

Easy to use to generate CSS classes within any framework, like React, Vue, Svelte, and more.

## Documentation

Here is the official website with the full documentation:

- [xsojs.dev](https://www.xsojs.dev/framework/css)

## Install

To start playing with XSO CSS:

`npm install -S @xso/css`

But better, is to use the PNPM:

`pnpm install @xso/css`

Or if you prefer Yarn:

`yarn add -S @xso/css`

Or even another package manager.

## How To Use

Example of the capabilities supported in the style objects definition:

`styles.js`

```javascript
const MEDIA_QUERY = '@media only screen and (max-width: 768px)';

const styles = {
  container: {
    backgroundColor: 'gray',
    ':hover': {
        cursor: 'pointer'
    },
    '> div': {
      padding: {
        default: '100px 150px',
        [MEDIA_QUERY]: '20px 50px'
      },
      '> button': {
        backgroundColor: 'red',
        ':hover': {
            backgroundColor: 'yellow',
        },
        [MEDIA_QUERY]: {
          backgroundColor: 'blue',
          ':hover': {
            backgroundColor: 'green'
          }
        }
      }
    }
  },
  button: {
    border: '2px solid pink',
    '&_on': {
        boxShadow: [
            '0 0 10px pink',
            '0 0 10px pink'
        ].join(','),
    }
  }
};

export default styles;
```

Then use it in your React component:

`index.jsx`

```javascript
import React, {useState} from 'react';

import css from '@xso/css';
import styles from './styles.js';

function Foo() {
    const [active, setActive] = useState(false);
    return (
        <div className={css(styles.container)}>
            <div>
                <button className={css(
                    styles.button,
                    styles[`button-${active === true && 'on'}`]
                )}
                onClick={()=> setActive(true)}>
                    Foo
                </button>
            </div>
        </div>
    );
}

export default Foo;
```

## Vanilla JS in HTML

Here is an integration directly in the raw HTML with pure JavaScript, like this:

```html
<!--
Here is the bundle JS file to download:
https://github.com/xsojs/css/blob/main/dist/xso-css.umd.js
-->
<script src="xso-css.umd.js"></script>

<div id="myElement">
    XSO Style
    <h2>Demo</h2>
    <div class="inner-container">
        <p>This works like LESS, SASS/SCSS, or StyleX, but directly in JavaScript vanilla.</p>
        <button>Click Me</button>
    </div>
</div>

<script>
const styles = {
    myFirstStyle: {
        padding: '20px',
        fontSize: '16px',
        border: '3px solid blue',
        backgroundColor: 'red',
        '> h2': {
            backgroundColor: 'orange'
        },
        '& div.inner-container': {
            margin: '20px',
            padding: '20px',
            backgroundColor: 'white'
        },
        ' p': {
            padding: '10px',
            border: '2px solid black'
        },
        '> div > button': {
            border: 'none',
            backgroundColor: 'green',
            color: 'white',
            padding: '5px',
            ':hover': {
                backgroundColor: 'blue',
            }
        }
    }
}
document.getElementById('myElement').className = css(
    styles.myFirstStyle
);
</script>
```

## Easy to integrate with others dependencies

You can integrate with any other dependency to add facilities.

A good one is the [TinyColor](https://github.com/bgrins/TinyColor) because have the power to manipulate color variants easily.

With all installed and ready to run, see this example:

`style.js`

```javascript

import tinycolor from "tinycolor2";

const primaryColor = tinycolor("#32a852");

const styles = {
  container: {
    backgroundColor: primaryColor.lighten(50).toString(),
    color: primaryColor.toString(),
    border: `5px solid ${primaryColor.darken(50).toString()}`
  }
};

export default styles;
```
