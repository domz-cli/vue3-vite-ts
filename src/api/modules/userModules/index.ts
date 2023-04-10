// export * from './infoAssets';
const modules: any = {};
const files = import.meta.globEager('./**/*.ts');
Object.keys(files).forEach((fileName: string) => {
    const name = fileName.replace(/\.\/|\.ts/g, '');
    modules[name] = files[fileName];
});

export default modules;
