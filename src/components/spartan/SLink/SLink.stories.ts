import SLink from './SLink.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';

export default {
    component: SLink,
    title: 'navigation/Link',
    ...createHistory({
        description: 'The link component is used to navigate between pages.',
        props: [
            { name: 'href', type: 'string', default: 'undefined', description: 'The type of the input element.' },
            { name: 'target', type: '_blank | _parent | _self | _top', default: 'undefined', description: 'The target attribute specifies where to open the linked document.' },
        ],
        slots: [
            { name: 'default', description: 'The content of the link.' },
        ],
    }),
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
