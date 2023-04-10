const modules: any = {};
const files: any = import.meta.globEager('./modules/**/index.ts');
Object.keys(files).forEach((fileName: string) => {
    // const name = fileName.replace(/\.\/modules\/|\*.ts/g, '');
    const regRes = /\.\/modules\/(\w{0,})|\.ts/g.exec(fileName) || [];
    const name = regRes[1] || '';
    modules[name] = files[fileName].default;
});

export default modules;
