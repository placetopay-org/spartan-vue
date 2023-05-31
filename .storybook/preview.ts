import "./../docs/assets/css/index.css";

import { type Preview, setup } from "@storybook/vue3";
import type { App } from "vue";
import { createI18n } from "vue-i18n";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  globalInjection: true,
});

setup((app: App) => {
  app.use(i18n);
});

export default preview;
