
const modes = {
    vanilla: true,
    react: false,
};

function mode(type) {
    if (!!type) {
      for (const key of Object.keys(modes)) {
        modes[key] = false;
      }
      modes[type] = true;
      return;
    }
    for (const key of Object.keys(modes)) {
      if (modes[key]) {
        return key;
      }
    }
    return null;
  }

  mode.vanilla = ()=> {
    return mode() == 'vanilla';
  }

  mode.react = ()=> {
    return mode() == 'react';
  }

  export default mode;