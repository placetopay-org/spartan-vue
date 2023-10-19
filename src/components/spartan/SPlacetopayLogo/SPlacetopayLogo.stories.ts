import SPlacetopayLogo from './SPlacetopayLogo.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SPlacetopayLogo,
    title: 'new/PlacetopayLogo',
    parameters: {
        docs: {
            description: {
                component: 'Easy to use wherever you want to place the Placetopay logo.',
            },
        },
    },
    argTypes: {
        // Props
        width: {
            control: 'number',
            description: 'The width of the logo.',
            table: { type: { summary: 'number' } },
        },
        height: {
            control: 'number',
            description: 'The height of the logo.',
            table: { type: { summary: 'number' } },
        },
        size: {
            control: 'select',
            options: ['none', 'md'],
            description: 'A defined size for the logo.',
            table: { type: { summary: 'none | md' } },
        },
        localAsset: {
            description: 'If true, the logo will be loaded from the local assets.',
            table: { type: { summary: 'boolean' } },
        },
        class: {
            control: { type: null },
            description: 'The class to be applied to the img element.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { size: 'md', width: undefined, height: undefined, localAsset: false, class: '' },
});

export const Default = createDefault({
    components: { SPlacetopayLogo },
    template: `<SPlacetopayLogo v-bind="args" />`,
    transform: (args) => `<SPlacetopayLogo ${sourceBinding(args)} />`,
    args: {
        width: 400,
        height: undefined,
        size: 'none',
        localAsset: false,
    },
});
