import { ensureObject } from "@xso/utils";
import jsKeyToCSS from "./jsKeyToCSS";

function createFontFace(def) {
    ensureObject(`Font-face ${def}`, def);
    let css = `@font-face {\n`;
    for (const key of Object.keys(def)) {
      const cssKey = jsKeyToCSS(key);
      css += `  ${cssKey}: ${def[key]};\n`;
    }
    css += '}';
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
}

export default createFontFace;