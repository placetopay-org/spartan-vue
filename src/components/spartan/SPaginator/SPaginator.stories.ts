import { ref } from 'vue';
import SPaginator from './SPaginator.vue';
import { buildSourceBinding, createDefault, createHistory, createVariation } from '@/helpers';

export default {
    component: SPaginator,
    title: 'navigation/Paginator',
    ...createHistory({
        description: 'The paginator component is used to navigate between pages.',
        props: [
            {
                name: 'state',
                type: '{ page: number; size: number; count: number; }',
                default: 'undefined',
                description: 'The state of paginator.',
            },
            {
                name: 'paginatorSize',
                type: 'number',
                default: 'undefined',
                description: 'The size of paginator component.',
            },
            {
                name: 'pageSizes',
                type: 'number[]',
                default: 'undefined',
                description: 'The options on page size select.',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SPaginator },
    setup: () => {
        const state = ref({ page: 3, size: 5, count: 25 });

        return { state }
    },
    template: `<SPaginator v-bind="args" v-model="state" />`,
    transform: (args) => `<SPaginator v-model="state" ${sourceBinding(args)}/>`,
    args: {
        paginatorSize: '0',
        pageSizes: [1, 5, 10, 15],
    },
});

export const Base = createVariation({
    components: { SPaginator },
    setup: () => {
        const state = ref({ page: 3, size: 5, count: 25 });

        return { state }
    },
    template: `<SPaginator v-model="state" />`,
});

export const PageSize = createVariation({
    components: { SPaginator },
    setup: () => {
        const state = ref({ page: 23, size: 20, count: 25 });

        return { state }
    },
    template: `<SPaginator v-model="state" :pageSizes="[10, 20, 30, 100]" />`,
});

export const PaginatorSize = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col items-center gap-4',
    setup: () => {
        const state = ref({ page: 18, size: 5, count: 25 });

        return { state }
    },
    template: `
<SPaginator v-model="state"  />
<SPaginator v-model="state" paginatorSize="1" />
<SPaginator v-model="state" paginatorSize="2" />
<SPaginator v-model="state" paginatorSize="3" />
<SPaginator v-model="state" paginatorSize="4" />
`,
});

