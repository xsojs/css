function uniqueCSSName(idPrefix, arr, def) {
    const defJSON = JSON.stringify(def);
    const reuse = arr.find((i)=> i.def == defJSON);
    if (reuse) {
      return {name: reuse.name, reused: true};
    }
    while (true) {
      const name = 'xso_'+ idPrefix +'_'+ (Math.random() + 1).toString(36).substring(2);
      if (arr.find((i)=> i.name == name)) {
        continue;
      }
      const newClass = {name, def: defJSON};
      arr.push(newClass);
      return {name: newClass.name, reused: false};
    }
}

export default uniqueCSSName;