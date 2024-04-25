const y = {
  vanilla: !0,
  react: !1
};
function l(e) {
  if (e) {
    for (const s of Object.keys(y))
      y[s] = !1;
    y[e] = !0;
    return;
  }
  for (const s of Object.keys(y))
    if (y[s])
      return s;
  return null;
}
l.vanilla = () => l() == "vanilla";
l.react = () => l() == "react";
function $(e, s) {
  if (typeof s != "object" || s == null || Array.isArray(s))
    throw new Error(`${e} is ${typeof s} and not a valid object.`);
}
function S(e, s, c) {
  const n = JSON.stringify(c), r = s.find((t) => t.def == n);
  if (r)
    return { name: r.name, reused: !0 };
  for (; ; ) {
    const t = "xso_" + e + "_" + (Math.random() + 1).toString(36).substring(2);
    if (s.find((a) => a.name == t))
      continue;
    const i = { name: t, def: n };
    return s.push(i), { name: i.name, reused: !1 };
  }
}
const C = /[A-Z]/g;
function b(e) {
  return e.replace(C, (s) => "-" + s.toLowerCase());
}
function h(e) {
  return e == "&" || e == ":" || e == "." || e == " " || e == ">" || e == "+" || e == "~";
}
function g(e, s) {
  let c = `${e} {
`;
  const n = {
    selectors: [],
    medias: []
  }, r = {
    selectors: [],
    medias: []
  };
  for (const t of Object.keys(s)) {
    const i = b(t), a = t.length > 0 ? t.substring(0, 1) : "";
    if (h(a)) {
      $(t, s[t]);
      const o = e + (a == "&" ? t.substring(1) : (a == ":" || a == "." || a == " " ? "" : " ") + t);
      n.selectors.push({
        selector: o,
        css: g(o, s[t])
      });
    } else if (a == "@")
      n.medias.push({
        media: t,
        css: g(e, s[t])
      });
    else if (typeof s[t] == "object" && s[t] !== null)
      for (const o of Object.keys(s[t])) {
        const m = `  ${i}: ${s[t][o]};
`;
        if (o == "default" || o == "def" || o == "_" || o == "") {
          c += m;
          continue;
        }
        const u = o.length > 0 ? o.substring(0, 1) : "";
        if (h(u)) {
          const f = r.selectors.find((d) => d.selector == o);
          if (f)
            f.css += m;
          else {
            const d = e + (u == "&" ? o.substring(1) : (u == ":" || u == "." || u == " " ? "" : " ") + o);
            r.selectors.push({
              selector: d,
              css: m
            });
          }
        } else if (u == "@") {
          const f = r.medias.find((d) => d.media == o);
          f ? f.css += m : r.medias.push({
            media: o,
            css: m
          });
        }
      }
    else
      c += `  ${i}: ${s[t]};
`;
  }
  c += "}";
  for (const t of r.selectors)
    c += `
${e}${t.selector} {
${t.css}}`;
  for (const t of r.medias)
    c += `
${t.media} {
${e} {
${t.css}}
}`;
  for (const t of n.selectors)
    c += `
${t.css}`;
  for (const t of n.medias)
    c += `
${t.media} {
${t.css}}`;
  return c;
}
const T = [];
function E(e) {
  return S("c", T, e);
}
function N(e) {
  $(`Class ${e}`, e);
  const s = E(e);
  if (s.reused)
    return s.name;
  const c = g("." + s.name, e), n = document.createElement("style");
  return n.type = "text/css", n.id = s.name, n.innerHTML = c, document.getElementsByTagName("head")[0].appendChild(n), s.name;
}
function O(e, s) {
  $(`Definition ${e} > ${s}`, s);
  const c = g(e, s), n = document.createElement("style");
  n.type = "text/css", n.innerHTML = c, document.getElementsByTagName("head")[0].appendChild(n);
}
function j(e) {
  const s = document.createElement("style");
  s.type = "text/css", s.innerHTML = `@import ${e};`, document.getElementsByTagName("head")[0].appendChild(s);
}
function v(e) {
  $(`Font-face ${e}`, e);
  let s = `@font-face {
`;
  for (const n of Object.keys(e)) {
    const r = b(n);
    s += `  ${r}: ${e[n]};
`;
  }
  s += "}";
  const c = document.createElement("style");
  c.type = "text/css", c.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(c);
}
function p() {
  if (arguments.length == 0)
    return null;
  const e = [];
  for (const s of arguments)
    e.push(N(s));
  if (l.vanilla())
    return e.join(" ");
  if (l.react())
    return { className: e.join(" ") };
}
p.mode = l;
p.def = (e, s) => {
  O(e, s);
};
p.import = (e) => {
  j(e);
};
p.fontFace = (e) => {
  v(e);
};
p.keyframes = (e) => createKeyframes(e);
export {
  p as default
};
