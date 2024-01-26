import SSteps from './SSteps.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SSteps,
    title: 'navigation/Steps',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Props
        steps: {
            control: 'select',
            options: ['0', '_parent', '_self', '_top'],
            description: 'The target attribute specifies where to open the linked document.',
            table: { type: { summary: 'TStep[]' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SSteps },
    template: `<SSteps v-bind="args" />`,
    transform: (args) => `<SSteps ${sourceBinding(args)}>${args.default}</SSteps>`,
    args: {
        steps: [
            {
                name: 'Create account',
                description: 'Vitae sed mi luctus laoreet.',
                href: '#',
                status: 'complete',
            },
            {
                name: 'Profile information',
                description: 'Cursus semper viverra facilisis et et some more.',
                href: '#',
                status: 'current',
            },
            {
                name: 'Business information',
                description: 'Penatibus eu quis ante.',
                href: '#',
                status: 'upcoming',
            },
            {
                name: 'Theme',
                description: 'Faucibus nec enim leo et.',
                href: '#',
                status: 'upcoming',
            },
            {
                name: 'Preview',
                description: 'Iusto et officia maiores porro ad non quas.',
                href: '#',
                status: 'upcoming',
            },
        ],
    },
});
