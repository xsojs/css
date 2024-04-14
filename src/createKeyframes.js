import { ensureObject } from "@xso/utils";
import jsKeyToCSS from "./jsKeyToCSS";
import uniqueCSSName from "./uniqueCSSName";

const keyframes = [];

function keyframesClassName(def) {
    return uniqueCSSName('k', keyframes, def);
}

function createKeyframes(def) {
    ensureObject(`Keyframes ${def}`, def);
    const keyframes = keyframesClassName(def);
    if (keyframes.reused) {
        return keyframes.name;
    }
    let css = `@keyframes ${keyframes.name} {\n`;
    for (const key of Object.keys(def)) {
        ensureObject(`Keyframes >> ${key}`, def[key]);
        css += `  ${key} {\n`;
        for (const valKey of Object.keys(def[key])) {
            const cssKey = jsKeyToCSS(valKey);
            css += `  ${cssKey}: ${def[key][valKey]};\n`;
        }
        css += '  }\n';
    }
    css += '}';
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = keyframes.name;
    styleTag.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    return keyframes.name;
}

export default createKeyframes;