import SLink from './SLink.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SLink,
    title: 'navigation/Link',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },

        // Props
        href: {
            control: 'text',
            description: 'The type of the input element.',
            table: { type: { summary: 'string' } },
        },
        target: {
            control: 'select',
            options: ['_blank', '_parent', '_self', '_top'],
            description: 'The target attribute specifies where to open the linked document.',
            table: { type: { summary: '_blank | _parent | _self | _top' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SLink },
    template: `<SLink v-bind="args">{{args.default}}</SLink>`,
    transform: (args) => `<SLink ${sourceBinding(args)}>${args.default}</SLink>`,
    args: {
        default: 'Link',
        href: '',
        target: undefined,
    },
});
