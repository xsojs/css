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
function a(e, n, s, c) {
  if (a.null == n)
    throw new Error(`${s} is null and not a valid ${e}.`);
  if (a.invalid == n)
    throw new Error(`${s} is ${typeof c} and not a valid ${e}.`);
}
a.array = "array";
a.function = "function";
a.object = "object";
a.string = "string";
a.null = 0;
a.invalid = 1;
function b(e, n) {
  n == null && a(a.object, a.null, e, n), (typeof n != "object" || Array.isArray(n)) && a(a.object, a.invalid, e, n);
}
function E(e, n, s) {
  const c = JSON.stringify(s), l = n.find((o) => o.def == c);
  if (l)
    return { name: l.name, reused: !0 };
  let t = s.name;
  if (t)
    for (let o = 0; o < n.length; o++)
      n[o].name == t && (n.splice(o, 1), o--);
  else
    for (; t = s.baseName || "xso_" + e, t += "_" + (Math.random() + 1).toString(36).substring(2), !!n.find((o) => o.name == t); )
      ;
  const m = { name: t, def: c };
  return n.push(m), { name: m.name, reused: !1 };
}
const N = /[A-Z]/g;
function S(e) {
  return e.replace(N, (n) => "-" + n.toLowerCase());
}
function h(e) {
  return e == "&" || e == ":" || e == "." || e == " " || e == ">" || e == "+" || e == "~";
}
function $(e, n) {
  let s = `${e} {
`;
  const c = {
    selectors: [],
    medias: []
  }, l = {
    selectors: [],
    medias: []
  };
  for (const t of Object.keys(n)) {
    if (t == "name" || t == "baseName")
      continue;
    const m = S(t), o = t.length > 0 ? t.substring(0, 1) : "";
    if (h(o)) {
      b(t, n[t]);
      const r = e + (o == "&" ? t.substring(1) : (o == ":" || o == "." || o == " " ? "" : " ") + t);
      c.selectors.push({
        selector: r,
        css: $(r, n[t])
      });
    } else if (o == "@")
      c.medias.push({
        media: t,
        css: $(e, n[t])
      });
    else if (typeof n[t] == "object" && n[t] !== null)
      for (const r of Object.keys(n[t])) {
        const f = `  ${m}: ${n[t][r]};
`;
        if (r == "default" || r == "def" || r == "_" || r == "") {
          s += f;
          continue;
        }
        const u = r.length > 0 ? r.substring(0, 1) : "";
        if (h(u)) {
          const d = l.selectors.find((y) => y.selector == r);
          if (d)
            d.css += f;
          else {
            const y = e + (u == "&" ? r.substring(1) : (u == ":" || u == "." || u == " " ? "" : " ") + r);
            l.selectors.push({
              selector: y,
              css: f
            });
          }
        } else if (u == "@") {
          const d = l.medias.find((y) => y.media == r);
          d ? d.css += f : l.medias.push({
            media: r,
            css: f
          });
        }
      }
    else
      s += `  ${m}: ${n[t]};
`;
  }
  s += "}";
  for (const t of l.selectors)
    s += `
${e}${t.selector} {
${t.css}}`;
  for (const t of l.medias)
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
const C = [];
function T(e) {
  return E("c", C, e);
}
function j(e) {
  b(`CSS class ${e}`, e);
  const n = T(e);
  if (n.reused)
    return n.name;
  const s = $("." + n.name, e), c = document.createElement("style");
  return c.type = "text/css", c.id = n.name, c.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(c), n.name;
}
function v(e, n) {
  b(`Definition ${e} > ${n}`, n);
  const s = $(e, n), c = document.createElement("style");
  c.type = "text/css", c.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(c);
}
function O(e) {
  const n = document.createElement("style");
  n.type = "text/css", n.innerHTML = `@import ${e};`, document.getElementsByTagName("head")[0].appendChild(n);
}
function k(e) {
  b(`Font-face ${e}`, e);
  let n = `@font-face {
`;
  for (const c of Object.keys(e)) {
    const l = S(c);
    n += `  ${l}: ${e[c]};
`;
  }
  n += "}";
  const s = document.createElement("style");
  s.type = "text/css", s.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(s);
}
function p() {
  if (arguments.length == 0)
    return null;
  const e = [];
  for (const n of arguments)
    e.push(j(n));
  if (i.vanilla())
    return e.join(" ");
  if (i.react())
    return { className: e.join(" ") };
}
p.mode = i;
p.def = (e, n) => {
  v(e, n);
};
p.import = (e) => {
  O(e);
};
p.fontFace = (e) => {
  k(e);
};
p.keyframes = (e) => createKeyframes(e);
export {
  p as default
};
