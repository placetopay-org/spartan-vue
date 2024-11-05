import fs from 'fs';

export const components = fs
    .readdirSync('./src/components/spartan', { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((dirent) => dirent.name);

export const componentsEntryMap = components.reduce((acc, component) => {
    acc[component] = `./src/components/spartan/${component}/index.ts`;
    return acc;
}, {});

export const componentsTypesMap = components.reduce((acc, component) => {
    acc[component] = `./dist/types/components/spartan/${component}/index.d.ts`;
    return acc;
}, {});
