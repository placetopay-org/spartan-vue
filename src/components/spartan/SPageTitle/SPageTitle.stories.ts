import SPageTitle from './SPageTitle.vue';
import { createDefault, createHistory } from '@/helpers';

export default {
    component: SPageTitle,
    title: 'typography/PageTitle',
    ...createHistory({
        description: 'The page title component is used to display a title in a page.',
        slots: [
            {
                name: 'default',
                description: 'The content of the description.',
                control: true,
            },
        ],
        props: [
            {
                name: 'class',
                type: 'string',
                default: 'undefined',
                description: 'Custom classes to be applied to the component.',
                control: null,
            },
        ],
    }),
};

export const Default = createDefault({
    components: { SPageTitle },
    template: `<SPageTitle>{{args.default}}</SPageTitle>`,
    transform: (args) => `<SPageTitle>${args.default}</SPageTitle>`,
    args: {
        default: 'My Page',
    },
});
