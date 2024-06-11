# @xso/css

XSO CSS works like [StyleX](https://stylexjs.com/) but supports [LESS](https://lesscss.org/) and [SASS/SCSS](https://sass-lang.com/) logic structures.

This pure JavaScript framework brings a new way to build your CSS, in a much more practical way, less verbose, without limitations, and with no compilations.

All CSS is generated on run-time and injected into `<style>`s in the HTML.

The style sheet is implemented in fully raw JavaScript Objects.

Easy to use to generate CSS classes within any framework, like React, Vue, Svelte, and more.

## Documentation

Here is the official website with the full documentation:

- [xsojs.dev](https://www.xsojs.dev/framework/css)

## Install

`npm install -S @xso/css`

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
<script src="https://raw.githubusercontent.com/xsojs/css/dist/xso-css.umd.js"></script>
<script>
const styles = {
    myFirstStyle: {
        fontSize: '16px',
        border: '3px solid blue',
        backgroundColor: 'red',
        color: 'yellow',
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
