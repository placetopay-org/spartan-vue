import * as spartanMessages from '../locales';

type Locale = 'en' | 'es' | 'pt' | 'it' | 'fr';
type Messages = Record<string, any>;

const isPlainObject = (value: unknown): value is Messages =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Deep-merges message catalogs into a fresh object — later sources win, and
 * `undefined` sources are skipped. Replaces the `lodash.merge`/`clone` pair
 * this module used to import: pulling the whole of lodash (~70 KB) into the
 * published `@placetopay/spartan-vue/i18n` entry for one shallow merge. Unlike
 * `merge(clone(a), …)`, this never mutates the shared `spartanMessages` tree.
 */
const mergeMessages = (...sources: (Messages | undefined)[]): Messages => {
    const result: Messages = {};
    for (const source of sources) {
        if (!isPlainObject(source)) continue;
        for (const key of Object.keys(source)) {
            const value = source[key];
            if (value === undefined) continue;
            result[key] = isPlainObject(value)
                ? mergeMessages(isPlainObject(result[key]) ? result[key] : {}, value)
                : value;
        }
    }
    return result;
};

const addSpartanMessages = (locale: Locale, baseMessages?: Messages, variantMessages?: Messages) =>
    mergeMessages(spartanMessages[locale], baseMessages, variantMessages);

export const addSpartanEnMessages = (baseMessages?: Messages, variantMessages?: Messages) =>
    addSpartanMessages('en', baseMessages, variantMessages);
export const addSpartanEsMessages = (baseMessages?: Messages, variantMessages?: Messages) =>
    addSpartanMessages('es', baseMessages, variantMessages);
export const addSpartanPtMessages = (baseMessages?: Messages, variantMessages?: Messages) =>
    addSpartanMessages('pt', baseMessages, variantMessages);
export const addSpartanItMessages = (baseMessages?: Messages, variantMessages?: Messages) =>
    addSpartanMessages('it', baseMessages, variantMessages);
export const addSpartanFrMessages = (baseMessages?: Messages, variantMessages?: Messages) =>
    addSpartanMessages('fr', baseMessages, variantMessages);

export const addSpartanAllMessages = (
    baseMessages: Partial<Record<Locale, Messages>>,
    config: { variants?: Partial<Record<Locale, Messages>> } = {},
) => ({
    en: addSpartanEnMessages(baseMessages.en, config.variants?.en),
    es: addSpartanEsMessages(baseMessages.es, config.variants?.es),
    pt: addSpartanPtMessages(baseMessages.pt, config.variants?.pt),
    it: addSpartanItMessages(baseMessages.it, config.variants?.it),
    fr: addSpartanFrMessages(baseMessages.fr, config.variants?.fr),
});
