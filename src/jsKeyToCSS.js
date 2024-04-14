const keyRegEx = /[A-Z]/g;
  
function jsKeyToCSS(jsKey) {
  return jsKey.replace(keyRegEx, (match) => '-'+ match.toLowerCase());
}

export default jsKeyToCSS;