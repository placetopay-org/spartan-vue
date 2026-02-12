import * as spartanLocales from '../../../src/locales';

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n as { mergeLocaleMessage: (locale: string, messages: Record<string, unknown>) => void };

    for (const [locale, messages] of Object.entries(spartanLocales)) {
        i18n.mergeLocaleMessage(locale, messages);
    }
});
