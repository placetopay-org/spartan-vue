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
                name: 'page',
                type: 'number',
                default: 'undefined',
                description: 'The current page.',
            },
            {
                name: 'size',
                type: 'number',
                default: 'undefined',
                description: 'The current page size.',
            },
            {
                name: 'total',
                type: 'number',
                default: 'undefined',
                description: 'The total count of items.',
            },
            {
                name: 'variant',
                type: 'string',
                default: 'undefined',
                description: 'The variant of paginator component.',
            },
            {
                name: 'hideWhenSinglePage',
                type: 'boolean',
                default: 'undefined',
                description: 'Hide paginator when there is only one page',
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
        const state = ref({ page: 3, size: 5, total: 125 });

        return { state };
    },
    template: `<!-- state: { page: 3, size: 5, total: 125 } -->
    <SPaginator v-bind="state" @change="newState => state = {...state, ...newState}" />`,
    transform: (args) =>
        `<SPaginator v-bind="state" ${sourceBinding(args)} @change="newState => state = {...state, ...newState}" />`,
    args: {
        paginatorSize: '0',
        pageSizes: [1, 5, 10, 15],
    },
});

export const Base = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col gap-4',
    setup: () => {
        const state1 = ref({ page: 3, count: 7 });
        const state2 = ref({ page: 3, size: 5, total: 32 });

        return { state1, state2 };
    },
    template: `<!-- state1: { page: 3, count: 7 } -->
<SPaginator v-bind="state1" @change="newState => state1 = {...state1, ...newState}" />

<!-- state2: { page: 3, size: 5, total: 125 } -->
<SPaginator v-bind="state2" @change="newState => state2 = {...state2, ...newState}" />`,
});

export const PageSize = createVariation({
    containerClass: 'flex flex-col gap-4',
    components: { SPaginator },
    setup: () => {
        const state1 = ref({ page: 3, size: 20, total: 125 });
        const state2 = ref({ page: 3, size: 33, count: 7 });

        return { state1, state2 };
    },
    template: `<!-- state1: { page: 3, size: 20, total: 125 } -->
<SPaginator v-bind="state1" :pageSizes="[10, 20, 30, 100]" @change="newState => state1 = {...state1, ...newState}"/>
<SPaginator v-bind="state1" hideNumbers :pageSizes="[10, 20, 30, 100]" @change="newState => state1 = {...state1, ...newState}"/>

<!-- state2: { page: 3, size: 33, count: 7 } -->
<SPaginator v-bind="state2" :pageSizes="[10, 20, 30, 100]" @change="newState => state2 = {...state2, ...newState}"/>
<SPaginator v-bind="state2" hideNumbers :pageSizes="[10, 20, 30, 100]" @change="newState => state2 = {...state2, ...newState}"/>
`,
});

export const PageSizeRestrictions = createVariation({
    containerClass: 'flex flex-col gap-4',
    components: { SPaginator },
    setup: () => {
        const state1 = ref({ page: 3, size: 29, total: 125 });
        const state2 = ref({ page: 3, size: 799, total: 125 });
        const state3 = ref({ page: 3, size: 29 });
        const state4 = ref({ page: 3, size: 799 });

        return { state1, state2, state3, state4 };
    },
    template: `<!-- state1: { page: 3, size: 29, total: 125 } -->
<SPaginator v-bind="state1" :pageSizes="[10, 20, 30, 100]" @change="newState => state1 = {...state1, ...newState}"/>

<!-- state2: { page: 3, size: 799, total: 125 } -->
<SPaginator v-bind="state2" :pageSizes="[10, 20, 30, 100]" @change="newState => state2 = {...state2, ...newState}"/>

<!-- state3: { page: 3, size: 29 } -->
<SPaginator v-bind="state3" :pageSizes="[10, 20, 30, 100]" @change="newState => state3 = {...state3, ...newState}"/>

<!-- state4: { page: 3, size: 799 } -->
<SPaginator v-bind="state4" :pageSizes="[10, 20, 30, 100]" @change="newState => state4 = {...state4, ...newState}"/>`,
});

export const HideNumbers = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col gap-4',
    setup: () => {
        const state = ref({ page: 3, size: 5, total: 125 });

        return { state };
    },
    template: `<!-- state: { page: 3, size: 5, total: 125 } -->
<SPaginator v-bind="state" @change="newState => state = {...state, ...newState}"/>

<SPaginator v-bind="state" hideNumbers @change="newState => state = {...state, ...newState}"/>`,
});

export const CanGoPrevOrNext = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col gap-4',
    setup: () => {
        const state = ref({ page: 3, size: 5, total: 125 });
        const state2 = ref({ page: 1, size: 5 });

        return { state, state2 };
    },
    template: `<!-- state: { page: 3, size: 5, total: 125 } -->
<SPaginator v-bind="state" :canGoPrev="false" :canGoNext="false" @change="newState => state = {...state, ...newState}"/>

<!-- state2: { page: 1, size: 5 } -->
<SPaginator v-bind="state2" @change="newState => state2 = {...state2, ...newState}"/>
<SPaginator v-bind="state2" :canGoPrev="true" :canGoNext="true" @change="newState => state2 = {...state2, ...newState}"/>`,
});

export const PaginatorSize = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col items-center gap-4',
    setup: () => {
        const state = ref({ page: 18, size: 5, total: 125 });

        return { state };
    },
    template: `
<SPaginator v-bind="state"  @change="newState => state = {...state, ...newState}"/>
<SPaginator v-bind="state" paginatorSize="1" @change="newState => state = {...state, ...newState}"/>
<SPaginator v-bind="state" paginatorSize="2" @change="newState => state = {...state, ...newState}"/>
<SPaginator v-bind="state" paginatorSize="3" @change="newState => state = {...state, ...newState}"/>
<SPaginator v-bind="state" paginatorSize="4" @change="newState => state = {...state, ...newState}"/>
`,
});

export const LaravelApiWithoutLinks = createVariation({
    components: { SPaginator },
    containerClass: 'flex flex-col gap-4',
    setup: () => {
        const mockLaravelSimpleResponse = {
            current_page: 1,
            first_page_url: 'http://laravel.app?page=1',
            from: 1,
            next_page_url: 'http://laravel.app?page=2',
            path: 'http://laravel.app',
            per_page: 15,
            prev_page_url: null,
            to: 10,
        };

        const mockLaravelResponse = {
            total: 50,
            per_page: 15,
            current_page: 1,
            last_page: 4,
            first_page_url: 'http://laravel.app?page=1',
            last_page_url: 'http://laravel.app?page=4',
            next_page_url: 'http://laravel.app?page=2',
            prev_page_url: null,
            path: 'http://laravel.app',
            from: 1,
            to: 15,
        };

        const mockLaravelResourceResponse = {
            links: {
                first: 'http://example.com/users?page=1',
                last: 'http://example.com/users?page=1',
                prev: null,
                next: null,
            },
            meta: {
                current_page: 1,
                from: 1,
                last_page: 1,
                path: 'http://example.com/users',
                per_page: 15,
                to: 10,
                total: 10,
            },
        };

        return { mockLaravelSimpleResponse, mockLaravelResponse, mockLaravelResourceResponse };
    },
    template: `<!-- mockLaravelSimpleResponse: {
    current_page: 1,
    first_page_url: 'http://laravel.app?page=1',
    from: 1,
    next_page_url: 'http://laravel.app?page=2',
    path: 'http://laravel.app',
    per_page: 15,
    prev_page_url: null,
    to: 10,
    data: [],
} -->
<SPaginator :laravel="mockLaravelSimpleResponse" :pageSizes="[10, 20, 30, 100]" />

<!-- mockLaravelResponse: {
    total: 50,
    per_page: 15,
    current_page: 1,
    last_page: 4,
    first_page_url: 'http://laravel.app?page=1',
    last_page_url: 'http://laravel.app?page=4',
    next_page_url: 'http://laravel.app?page=2',
    prev_page_url: null,
    path: 'http://laravel.app',
    from: 1,
    to: 15
} -->
<SPaginator :laravel="mockLaravelResponse" :pageSizes="[10, 20, 30, 100]" />

<!-- mockLaravelResourceResponse: {
    links: {
        first: 'http://example.com/users?page=1',
        last: 'http://example.com/users?page=1',
        prev: null,
        next: null,
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: 'http://example.com/users',
        per_page: 15,
        to: 10,
        total: 10,
    },
} -->
<SPaginator :laravel="mockLaravelResourceResponse" :pageSizes="[10, 20, 30, 100]" />
`,
});

export const LaravelAndInertia = createVariation({
    components: { SPaginator },
    setup: () => {
        const mockLaravelResponse = {
            total: 50,
            per_page: 15,
            current_page: 1,
            last_page: 4,
            first_page_url: 'http://laravel.app?page=1',
            last_page_url: 'http://laravel.app?page=4',
            next_page_url: 'http://laravel.app?page=2',
            prev_page_url: null,
            path: 'http://laravel.app',
            from: 1,
            to: 15,
            data: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
                { id: 3, name: 'John Smith' },
            ],
        };
        const state = ref({ laravel: mockLaravelResponse });

        return { mockLaravelResponse };
    },
    template: `<!-- import { router } from '@inertiajs/vue3'; -->
<SPaginator :laravel="mockLaravelResponse" :inertiaRouter="router" :pageSizes="[10, 20, 30, 100]" />

<!-- mockLaravelResponse: {
    "data": [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'John Smith' },
    ],
    "total": 4,
    "links": {
        "first": "http://laravel.app?page=1",
        "last": "http://laravel.app?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://laravel.app?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "http://laravel.app",
        "per_page": 20,
        "to": 4,
        "total": 4
    }
} -->`,
});
