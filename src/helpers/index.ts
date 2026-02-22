export * from './i18n';
export * from './slotContent';
export * from './styles';
export * from './sanitizer';
export * from './blockWrapper';
export * from './dom';
export * from './context';
export * from './passThrough';

export const buildExampleLink = (example: string, name: string): string =>
    `https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/${name}/${example}`;
