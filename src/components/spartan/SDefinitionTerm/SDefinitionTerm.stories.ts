import SDefinitionTerm from './SDefinitionTerm.vue';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';
import { SCard } from '@spartan';

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

export const OneLine = createVariation({
    components: { SDefinitionTerm, SCard },
    template: `
<SCard class="w-[1000px]" pt:body="divide-y divide-gray-200">
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="Usuario responsable" description="guest" />
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="IdEmpresa" description="123" />
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="userAgent" description="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" />
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="returnUrl">
        <template #description>
            <a href="#" class="text-spartan-primary-500 underline text-sm">https://mysite.com/response</a>
        </template>
    </SDefinitionTerm>
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="_session_" description="88879" />
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="_wcTransactionId_" description="34266" />
    <SDefinitionTerm class="grid grid-cols-3 p-4" pt:dt="col-span-1" pt:dd="col-span-2" labels="_walletMethodId_" description="434344" />
</SCard>
`,
});
