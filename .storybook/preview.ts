import '../src/styles/main.css';
import './styles.css';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import { type Preview, setup } from '@storybook/vue3-vite';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import * as messages from '../src/locales';
import { themes } from 'storybook/theming';
import { onMounted } from 'vue';

const preview: Preview = {
    parameters: {
        darkMode: {
            classTarget: 'html',
            darkClass: 'dark',
            lightClass: 'light-mode',
            // Override the default dark theme for manager UI
            dark: {
                ...themes.dark,
                appBg: '#0f172a',
                appContentBg: '#0f172a',
                textColor: '#e2e8f0',
                barBg: '#1f2937',
            },
            // Override the default light theme for manager UI
            light: {
                ...themes.normal,
                appBg: '#f8fafc',
                appContentBg: '#ffffff',
                textColor: '#0f172a',
                barBg: '#ffffff',
            },
            // Apply dark theme to docs as well
            stylePreview: true,
        },
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
    decorators: [
        (story, context) => ({
            components: { story },
            setup() {
                const syncDarkMode = () => {
                    const parentHtml = window.parent?.document?.documentElement;
                    const hasDark = parentHtml?.classList.contains('dark');
                    document.documentElement.classList.toggle('dark', !!hasDark);
                };

                onMounted(() => {
                    syncDarkMode();
                    // Watch for dark mode toggles in the manager window
                    const parentHtml = window.parent?.document?.documentElement;
                    if (parentHtml) {
                        const observer = new MutationObserver(syncDarkMode);
                        observer.observe(parentHtml, { attributes: true, attributeFilter: ['class'] });
                    }
                });

                return {};
            },
            // Only wrap stories (not docs pages) with background
            template: context.viewMode === 'docs'
                ? '<story />'
                : `<div class="min-h-screen bg-white text-slate-900 dark:bg-[#0f172a] dark:text-slate-200">
                    <story />
                   </div>`,
        }),
    ],
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
