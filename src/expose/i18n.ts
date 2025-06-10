import * as spartanMessages from '../locales';
import { merge, clone } from 'lodash';

const mergeMessages = (base: any, source: any) => {
    return merge(clone(base), clone(source));
}

const addSpartanMessages = (locale: 'en' | 'es' | 'pt' | 'it', baseMessages: any) => {
    return mergeMessages(spartanMessages?.[locale], baseMessages);
};

export const addSpartanEnMessages = (baseMessages: any) => addSpartanMessages('en', baseMessages);
export const addSpartanEsMessages = (baseMessages: any) => addSpartanMessages('es', baseMessages);
export const addSpartanPtMessages = (baseMessages: any) => addSpartanMessages('pt', baseMessages);
export const addSpartanItMessages = (baseMessages: any) => addSpartanMessages('it', baseMessages);

export const addSpartanAllMessages = (
    baseMessages: any,
    config: { variants?: { en?: any; es?: any; pt?: any; it?: any } } = {},
) => {
    const en = addSpartanEnMessages(baseMessages.en);
    const es = addSpartanEsMessages(baseMessages.es);
    const pt = addSpartanPtMessages(baseMessages.pt);
    const it = addSpartanItMessages(baseMessages.it);

    const variants = {} as any;
    // if (config.variants) {
    //     const localeMessages = { en, es, pt, it };
        
    //     Object.entries(config.variants).forEach(([locale, localeVariants]) => {
    //         if (localeVariants && localeMessages[locale as keyof typeof localeMessages]) {
    //             Object.entries(localeVariants).forEach(([variant, variantMessages]) => {
    //                 variants[variant] = mergeMessages(
    //                     localeMessages[locale as keyof typeof localeMessages], 
    //                     variantMessages
    //                 );
    //             });
    //         }
    //     });
    // }

    return { en, es, pt, it, variants };
};
