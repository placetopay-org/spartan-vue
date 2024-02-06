import SDefinitionTerm from './SDefinitionTerm.vue';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';

export default {
    component: SDefinitionTerm,
    title: 'display/DefinitionTerm',
    ...createHistory({
        description: 'The definition term component is used to display a label and description of a term.',
        slots: [
            {
                name: 'default',
                description: 'The label of the term.',
            },
            {
                name: 'description_',
                description: 'The description of the term.',
            },
            {
                name: 'label',
                description: 'Using numbered slots, you can have multiple labels.',
            },
        ],
        props: [
            {
                name: 'labels',
                description: 'The label/title of the term.',
                type: 'string | string[]',
                control: 'text',
            },
            {
                name: 'description',
                description: 'The description of the term.',
                type: 'string',
                control: 'text',
            },
        ],
    }),
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
