import '../src/styles/main.css';
import './styles.css';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import { type Preview, setup } from '@storybook/vue3-vite';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import * as messages from '../src/locales';

const preview: Preview = {
    parameters: {
        docs: {
            page: DocumentationTemplate,
        },
        backgrounds: {
            default: 'light',
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    tags: ['autodocs'],
};

const i18n = createI18n({
    legacy: false,
    locale: 'es',
    messages,
    fallbackLocale: 'en',
});

setup((app: App) => {
    app.use(i18n);
});

export default preview;
