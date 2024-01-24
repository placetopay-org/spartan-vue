import SDefinitionTerm from './SDefinitionTerm.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SDefinitionTerm,
    title: 'new/DefinitionTerm',
    parameters: {
        docs: {
            description: {
                component: 'The definition term component is used to display a label and description of a term.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            description: 'The label of the term.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },

        // Props
        labels: {
            control: 'text',
            description: 'The label/title of the term.',
            table: { type: { summary: 'string' } },
        },
        description: {
            control: 'text',
            description: 'The description of the term.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { labels: undefined, description: undefined },
});

export const Default = createDefault({
    components: { SDefinitionTerm },
    template: `<SDefinitionTerm v-bind="args" />`,
    transform: (args) => `<SDefinitionTerm ${sourceBinding(args)}/>`,
    args: {
        default: undefined,
        labels: 'First Name',
        description: 'John Doe',
    },
});

export const PropsOrSlots = createVariation({
    components: { SDefinitionTerm },
    template: `<SDefinitionTerm labels="Label by prop" description="Description by prop" />

<SDefinitionTerm>
    Label by slot
    <template #description>Description by slot</template>
</SDefinitionTerm>`,
});

export const MultipleLabels = createVariation({
    components: { SDefinitionTerm },
    template: `<SDefinitionTerm :labels="['Label by prop #1', 'Label by prop #2']" description="Description by prop" />

<SDefinitionTerm>
    <template #1>Label by slot #1</template>
    <template #2>Label by slot #2</template>
    
    <template #description>Description by slot</template>
</SDefinitionTerm>`,
});
