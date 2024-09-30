import { ensureObject } from "@xso/utils";
import jsKeyToCSS from "./jsKeyToCSS";

function isSelectorPrefix(keyPrefix) {
    return keyPrefix == '&' || keyPrefix == ':' || keyPrefix == '.'
        || keyPrefix == ' ' || keyPrefix == '>' || keyPrefix == '+' || keyPrefix == '~';
}

function selectorWriter(selector, def) {
    let css = `${selector} {\n`;
    const root = {
        selectors: [],
        medias: [],
    };
    const inner = {
        selectors: [],
        medias: [],
    };
    for (const key of Object.keys(def)) {
        if (key == 'name' || key == 'baseName') {
            continue;
        }
        const cssKey = jsKeyToCSS(key);
        const keyPrefix = key.length > 0 ? key.substring(0, 1) : '';
        if (isSelectorPrefix(keyPrefix)) {
            ensureObject(key, def[key]);
            const subSelector = selector + (
                keyPrefix == '&' ? key.substring(1) : (keyPrefix == ':' || keyPrefix == '.' || keyPrefix == ' ' ? '' : ' ') + key
            );
            root.selectors.push({
                selector: subSelector,
                css: selectorWriter(subSelector, def[key])
            });
        } else if (keyPrefix == '@') {
            root.medias.push({
                media: key,
                css: selectorWriter(selector, def[key])
            });
        } else if (typeof def[key] === 'object' && def[key] !== null) {
            for (const valKey of Object.keys(def[key])) {
                const cssProperty = `  ${cssKey}: ${def[key][valKey]};\n`;
                if (valKey == 'default' || valKey == 'def' || valKey == '_' || valKey == '') {
                    css += cssProperty;
                    continue;
                }
                const valKeyPrefix = valKey.length > 0 ? valKey.substring(0, 1) : '';
                if (isSelectorPrefix(valKeyPrefix)) {
                    const reuseS = inner.selectors.find((s) => s.selector == valKey);
                    if (reuseS) {
                        reuseS.css += cssProperty;
                    } else {
                        const subSelector = selector + (
                            valKeyPrefix == '&' ? valKey.substring(1) : (valKeyPrefix == ':' || valKeyPrefix == '.' || valKeyPrefix == ' ' ? '' : ' ') + valKey
                        );
                        inner.selectors.push({
                            selector: subSelector,
                            css: cssProperty
                        });
                    }
                } else if (valKeyPrefix == '@') {
                    const reuseM = inner.medias.find((m) => m.media == valKey);
                    if (reuseM) {
                        reuseM.css += cssProperty;
                    } else {
                        inner.medias.push({
                            media: valKey,
                            css: cssProperty
                        });
                    }
                }
            }
        } else {
            css += `  ${cssKey}: ${def[key]};\n`;
        }
    }
    css += '}';
    for (const s of inner.selectors) {
        css += `\n${selector}${s.selector} {\n${s.css}}`;
    }
    for (const mq of inner.medias) {
        css += `\n${mq.media} {\n${selector} {\n${mq.css}}\n}`;
    }
    for (const s of root.selectors) {
        css += `\n${s.css}`;
    }
    for (const mq of root.medias) {
        css += `\n${mq.media} {\n${mq.css}}`;
    }
    return css;
}

export default selectorWriter;