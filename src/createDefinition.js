import { ensureObject } from "@xso/utils";
import selectorWriter from "./selectorWriter";

function createDefinition(selector, jsDefinition) {
  ensureObject(`Definition ${selector} > ${jsDefinition}`, jsDefinition);
  const css = selectorWriter(selector, jsDefinition);
  const baseStyle = document.createElement('style');
  baseStyle.type = 'text/css';
  baseStyle.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(baseStyle);
}

export default createDefinition;