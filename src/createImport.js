function createImport(info) {
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = `@import ${info};`;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
}

export default createImport;