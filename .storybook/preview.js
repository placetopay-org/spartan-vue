import "./../docs/assets/css/index.css";

import { app } from '@storybook/vue3'
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  globalInjection: true,
});

app.use(i18n)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
