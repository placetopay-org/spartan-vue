import Filter from './Filter.vue';
import Search from './Search.vue';
import AutoSearch from './AutoSearch.vue';
import FilterAndSearch from './FilterAndSearch.vue';
import { createDefault, createVariation } from '../../../helpers';

export default {
    component: Filter,
    title: 'examples/Filters',
};

export const SearchStory = {
    decorators: [() => ({ template: '<div style="width: 512px;"><story/></div>' })],
    render: (args: any) => ({
        components: { SearchFilter: Search },
        setup() {
            return { args };
        },
        template: `<SearchFilter v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `TEST`,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        modelValue: true,
    },
};

export const FilterStory = {
    decorators: [() => ({ template: '<div style="width: 512px;"><story/></div>' })],
    render: (args: any) => ({
        components: { Filters: Filter },
        setup() {
            return { args };
        },
        template: `<Filters v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `TEST`,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        modelValue: true,
    },
};

export const AutoSearchStory = {
    decorators: [() => ({ template: '<div style="width: 512px;"><story/></div>' })],
    render: (args: any) => ({
        components: { AutoSearchFilter: AutoSearch },
        setup() {
            return { args };
        },
        template: `<AutoSearchFilter v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `TEST`,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        modelValue: true,
    },
};

// export const FilterAndSearchStory = {
//     decorators: [() => ({ template: '<div style="width: 512px;"><story/></div>' })],
//     render: (args: any) => ({
//         components: { FilterAndSearch: FilterAndSearch },
//         setup() {
//             return { args };
//         },
//         template: `<FilterAndSearch v-bind="args" v-model="args.modelValue"/>`,
//     }),
// };

export const FilterAndSearchStory = createVariation({
    components: { FilterAndSearch },
    template: `<FilterAndSearch />`,
});