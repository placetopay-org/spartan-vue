import './styles.css';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import { type Preview, setup } from '@storybook/vue3-vite';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import * as messages from '../src/locales';

const preview: Preview = {
    initialGlobals: {
        backgrounds: {
            default: 'light',
        },
    },
    parameters: {
        docs: {
            page: DocumentationTemplate,
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                order: [
                    'Introduction',
                    'Docs',
                    'typography',
                    'buttons',
                    'display',
                    'tables',
                    'modals',
                    'navigation',
                    'misc',
                    'inputs',
                    'inputBlocks',
                    '*',
                    'examples',
                ],
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
