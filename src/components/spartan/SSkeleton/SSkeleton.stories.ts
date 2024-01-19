import SSkeleton from './SSkeleton.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SSkeleton,
    title: 'new/Skeleton',
    parameters: {
        docs: {
            description: {
                component: 'The skeleton component is used to display a loading state.',
            },
        },
    },
    argTypes: {
        // Props
        class: {
            control: { type: null },
            description: 'The css class of the skeleton.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    containerClass: 'w-[200px]',
    components: { SSkeleton },
    template: `<SSkeleton v-bind="args" />`,
    transform: (args) => `<SSkeleton ${sourceBinding(args)} />`,
    args: {},
});

export const Base = createVariation({
    components: { SSkeleton },
    template: `<SSkeleton class="w-40" />`,
});

export const Circle = createVariation({
    components: { SSkeleton },
    template: `<SSkeleton class="rounded-full h-20 w-20" />`,
});

export const Square = createVariation({
    components: { SSkeleton },
    template: `<SSkeleton class="h-20 w-20" />`,
});

export const Rectangle = createVariation({
    components: { SSkeleton },
    template: `<SSkeleton class="h-20 w-40" />`,
});
