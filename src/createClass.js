import { ensureObject } from "@xso/utils";
import uniqueCSSName from "./uniqueCSSName";
import selectorWriter from "./selectorWriter";

const classes = [];

function className(def) {
  return uniqueCSSName('c', classes, def);
}

function createClass(jsDefinition) {
  ensureObject(`Class ${jsDefinition}`, jsDefinition);
  const theClass = className(jsDefinition);
  if (theClass.reused) {
    return theClass.name;
  }
  const css = selectorWriter('.'+ theClass.name, jsDefinition);
  const baseStyle = document.createElement('style');
  baseStyle.type = 'text/css';
  baseStyle.id = theClass.name;
  baseStyle.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(baseStyle);
  return theClass.name;
}

export default createClass;