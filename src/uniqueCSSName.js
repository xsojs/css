function uniqueCSSName(idPrefix, arr, def) {
  const defJSON = JSON.stringify(def);
  const reuse = arr.find((i)=> i.def == defJSON);
  if (reuse) {
    return {name: reuse.name, reused: true};
  }
  let name = def.name;
  if (name) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name == name) {
        arr.splice(i, 1);
        i--;
      }
    }
  } else {
    while (true) {
      name = def.baseName || 'xso_'+ idPrefix;
      name += '_'+ (Math.random() + 1).toString(36).substring(2);
      if (arr.find((i)=> i.name == name)) {
        continue;
      }
      break;
    }
  }
  const newClass = {name, def: defJSON};
  arr.push(newClass);
  return {name: newClass.name, reused: false};
}

export default uniqueCSSName;