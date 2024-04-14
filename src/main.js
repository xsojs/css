import mode from './mode';
import createClass from './createClass';
import createDefinition from './createDefinition';
import createImport from './createImport';
import createFontFace from './createFontFace';

function css() {
  if (arguments.length == 0) {
    return null;
  }
  const classNames = [];
  for (const argument of arguments) {
    classNames.push(createClass(argument));
  }
  if (mode.vanilla()) {
    return classNames.join(' ');
  }
  if (mode.react()) {
    return {className: classNames.join(' ')};
  }
}

css.mode = mode;

css.def = (selector, jsDefinition)=> {
  createDefinition(selector, jsDefinition);
};

css.import = (info)=> {
  createImport(info);
};

css.fontFace = (def)=> {
  createFontFace(def);
};

css.keyframes = (def)=> {
  return createKeyframes(def);
};

export default css;
