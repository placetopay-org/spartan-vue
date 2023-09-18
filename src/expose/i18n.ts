import spartanMessages from '@intlify/unplugin-vue-i18n/messages';
import { merge, clone } from 'lodash';
export { spartanMessages };

const addSpartanMessages = (locale: string, baseMessages: any) => {
    return merge(clone(spartanMessages[locale]), clone(baseMessages));
};

export const addSpartanEnMessages = (baseMessages: any) => addSpartanMessages('en', baseMessages);
export const addSpartanEsMessages = (baseMessages: any) => addSpartanMessages('es', baseMessages);
export const addSpartanPtMessages = (baseMessages: any) => addSpartanMessages('pt', baseMessages);
export const addSpartanItMessages = (baseMessages: any) => addSpartanMessages('it', baseMessages);

export const addSpartanAllMessages = (baseMessages: any) => {
    return {
        en: addSpartanEnMessages(baseMessages.en),
        es: addSpartanEsMessages(baseMessages.es),
        pt: addSpartanPtMessages(baseMessages.pt),
        it: addSpartanItMessages(baseMessages.it),
    };
};
