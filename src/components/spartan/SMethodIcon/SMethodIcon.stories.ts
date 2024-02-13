import SMethodIcon from './SMethodIcon.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';
import { methodName } from './constants';

export default {
    component: SMethodIcon,
    title: 'display/MethodIcon',
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
                options: methodName as unknown as string[],
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
    components: { SMethodIcon },
    args: {
        name: 'visa',
        size: 200,
    },
    template: `<SMethodIcon class="fill-red-500" v-bind="argsWithoutSlots" />`,
    transform: (args) => `<SMethodIcon ${sourceBinding(args)} />`,
});
