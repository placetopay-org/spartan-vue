import SCardBrand from './SCardBrand.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';
import { brandName } from './constants';

export default {
    component: SCardBrand,
    title: 'display/CardBrand',
    ...createHistory({
        description: 'This component is used to display a payment method icon.',
        props: [
            {
                name: 'class',
                type: 'string',
                default: 'undefined',
                description: 'Custom classes to be applied to the component.',
                control: null,
            },
            {
                name: 'name',
                type: 'string',
                default: 'undefined',
                options: brandName as unknown as string[],
                description: 'The name of the icon to be displayed.',
            },
            {
                name: 'size',
                type: 'number',
                default: '24',
                description: 'The size of the icon.',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    prop: { name: undefined },
});

export const Default = createDefault({
    components: { SCardBrand },
    args: {
        name: 'visa',
        size: 200,
    },
    template: `<SCardBrand v-bind="argsWithoutSlots" />`,
    transform: (args) => `<SCardBrand ${sourceBinding(args)} />`,
});
