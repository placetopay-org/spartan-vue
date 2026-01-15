import * as spartanMessages from '../locales';
import { merge, clone } from 'lodash';

const addSpartanMessages = (locale: 'en' | 'es' | 'pt' | 'it', baseMessages: any, variantMessages?: any) => {
    return merge(clone(spartanMessages?.[locale]), clone(baseMessages), clone(variantMessages));
};

export const addSpartanEnMessages = (baseMessages: any, variantMessages?: any) =>
    addSpartanMessages('en', baseMessages, variantMessages);
export const addSpartanEsMessages = (baseMessages: any, variantMessages?: any) =>
    addSpartanMessages('es', baseMessages, variantMessages);
export const addSpartanPtMessages = (baseMessages: any, variantMessages?: any) =>
    addSpartanMessages('pt', baseMessages, variantMessages);
export const addSpartanItMessages = (baseMessages: any, variantMessages?: any) =>
    addSpartanMessages('it', baseMessages, variantMessages);

export const addSpartanAllMessages = (
    baseMessages: any,
    config: { variants?: { en?: any; es?: any; pt?: any; it?: any } } = {},
) => {
    return {
        en: addSpartanEnMessages(baseMessages.en, config.variants?.en),
        es: addSpartanEsMessages(baseMessages.es, config.variants?.es),
        pt: addSpartanPtMessages(baseMessages.pt, config.variants?.pt),
        it: addSpartanItMessages(baseMessages.it, config.variants?.it),
    };
};
