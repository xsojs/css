const g = {
  vanilla: !0,
  react: !1
};
function i(e) {
  if (e) {
    for (const n of Object.keys(g))
      g[n] = !1;
    g[e] = !0;
    return;
  }
  for (const n of Object.keys(g))
    if (g[n])
      return n;
  return null;
}
i.vanilla = () => i() == "vanilla";
i.react = () => i() == "react";
function r(e, n, s, c) {
  if (r.null == n)
    throw new Error(`${s} is null and not a valid ${e}.`);
  if (r.invalid == n)
    throw new Error(`${s} is ${typeof c} and not a valid ${e}.`);
}
r.array = "array";
r.function = "function";
r.object = "object";
r.string = "string";
r.null = 0;
r.invalid = 1;
function h(e, n) {
  n == null && r(r.object, r.null, e, n), (typeof n != "object" || Array.isArray(n)) && r(r.object, r.invalid, e, n);
}
function E(e, n, s) {
  const c = JSON.stringify(s), a = n.find((t) => t.def == c);
  if (a)
    return { name: a.name, reused: !0 };
  for (; ; ) {
    const t = "xso_" + e + "_" + (Math.random() + 1).toString(36).substring(2);
    if (n.find((l) => l.name == t))
      continue;
    const m = { name: t, def: c };
    return n.push(m), { name: m.name, reused: !1 };
  }
}
const C = /[A-Z]/g;
function S(e) {
  return e.replace(C, (n) => "-" + n.toLowerCase());
}
function b(e) {
  return e == "&" || e == ":" || e == "." || e == " " || e == ">" || e == "+" || e == "~";
}
function p(e, n) {
  let s = `${e} {
`;
  const c = {
    selectors: [],
    medias: []
  }, a = {
    selectors: [],
    medias: []
  };
  for (const t of Object.keys(n)) {
    const m = S(t), l = t.length > 0 ? t.substring(0, 1) : "";
    if (b(l)) {
      h(t, n[t]);
      const o = e + (l == "&" ? t.substring(1) : (l == ":" || l == "." || l == " " ? "" : " ") + t);
      c.selectors.push({
        selector: o,
        css: p(o, n[t])
      });
    } else if (l == "@")
      c.medias.push({
        media: t,
        css: p(e, n[t])
      });
    else if (typeof n[t] == "object" && n[t] !== null)
      for (const o of Object.keys(n[t])) {
        const f = `  ${m}: ${n[t][o]};
`;
        if (o == "default" || o == "def" || o == "_" || o == "") {
          s += f;
          continue;
        }
        const u = o.length > 0 ? o.substring(0, 1) : "";
        if (b(u)) {
          const d = a.selectors.find((y) => y.selector == o);
          if (d)
            d.css += f;
          else {
            const y = e + (u == "&" ? o.substring(1) : (u == ":" || u == "." || u == " " ? "" : " ") + o);
            a.selectors.push({
              selector: y,
              css: f
            });
          }
        } else if (u == "@") {
          const d = a.medias.find((y) => y.media == o);
          d ? d.css += f : a.medias.push({
            media: o,
            css: f
          });
        }
      }
    else
      s += `  ${m}: ${n[t]};
`;
  }
  s += "}";
  for (const t of a.selectors)
    s += `
${e}${t.selector} {
${t.css}}`;
  for (const t of a.medias)
    s += `
${t.media} {
${e} {
${t.css}}
}`;
  for (const t of c.selectors)
    s += `
${t.css}`;
  for (const t of c.medias)
    s += `
${t.media} {
${t.css}}`;
  return s;
}
const T = [];
function j(e) {
  return E("c", T, e);
}
function v(e) {
  h(`CSS class ${e}`, e);
  const n = j(e);
  if (n.reused)
    return n.name;
  const s = p("." + n.name, e), c = document.createElement("style");
  return c.type = "text/css", c.id = n.name, c.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(c), n.name;
}
function N(e, n) {
  h(`Definition ${e} > ${n}`, n);
  const s = p(e, n), c = document.createElement("style");
  c.type = "text/css", c.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(c);
}
function O(e) {
  const n = document.createElement("style");
  n.type = "text/css", n.innerHTML = `@import ${e};`, document.getElementsByTagName("head")[0].appendChild(n);
}
function w(e) {
  h(`Font-face ${e}`, e);
  let n = `@font-face {
`;
  for (const c of Object.keys(e)) {
    const a = S(c);
    n += `  ${a}: ${e[c]};
`;
  }
  n += "}";
  const s = document.createElement("style");
  s.type = "text/css", s.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(s);
}
function $() {
  if (arguments.length == 0)
    return null;
  const e = [];
  for (const n of arguments)
    e.push(v(n));
  if (i.vanilla())
    return e.join(" ");
  if (i.react())
    return { className: e.join(" ") };
}
$.mode = i;
$.def = (e, n) => {
  N(e, n);
};
$.import = (e) => {
  O(e);
};
$.fontFace = (e) => {
  w(e);
};
$.keyframes = (e) => createKeyframes(e);
export {
  $ as default
};
