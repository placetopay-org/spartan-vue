<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

const emits = defineEmits<{
    (e: 'changeCurrentPage', page: number): void;
}>();

const props = defineProps<{
    currentPage: number;
    lastPage: number;
    simple?: boolean;
}>();

const { t } = useI18n({
    useScope: 'local',
    messages: {
        en: {
            spartan: {
                sfilters: {
                    previous: 'Previous',
                    next: 'Next',
                },
            },
        },
        es: {
            spartan: {
                sfilters: {
                    previous: 'Anterior',
                    next: 'Siguiente',
                },
            },
        },
        it: {
            spartan: {
                sfilters: {
                    previous: 'Precedente',
                    next: 'Prossimo',
                },
            },
        },
        pt: {
            spartan: {
                sfilters: {
                    previous: 'anterior',
                    next: 'Next',
                },
            },
        },
    },
});

const pages = computed(() => (props.simple ? [] : getPages(props.lastPage, props.currentPage)));

const getPages = (last: number, current: number) => {
    const size = 7;
    let arr = [];

    if (last <= size) {
        const total = last < size ? last : size;
        return Array.from({ length: total }, (value, index) => index + 1);
    }

    if (last - current > 2 && current > 3) {
        arr = [];

        arr.push(1);
        arr.push('...');
        arr.push(current - 1);
        arr.push(current);
        arr.push(current + 1);
        arr.push('...');
        arr.push(last);

        return arr;
    }

    for (let i = 1; i <= 3; i++) {
        arr.push(i);
    }

    arr.push('...');

    for (let i = size - 5; i >= 0; i--) {
        arr.push(last - i);
    }

    return arr;
};

const changeCurrentPage = (page: number) => {
    emits('changeCurrentPage', page);
};
</script>

<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 items-center justify-between">
            <slot />
        </div>

        <div>
            <nav
                class="relative z-0 inline-flex"
                :class="{
                    '-space-x-px rounded-md shadow-sm': !simple,
                    'gap-3': simple,
                }"
                aria-label="Pagination"
            >
                <button
                    :disabled="currentPage <= 1"
                    class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 focus-visible:outline-none active:z-10 active:bg-primary-50 active:text-primary-600 active:ring-2 active:ring-primary-100 disabled:bg-gray-50 disabled:text-gray-500"
                    :class="{
                        'rounded-lg': simple,
                        'rounded-l-lg': !simple,
                    }"
                    @click="changeCurrentPage(currentPage - 1)"
                >
                    <span :class="{ 'sr-only': !simple }">{{ t('spartan.sfilters.previous') }}</span>
                    <ChevronLeftIcon v-if="!simple" class="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                    v-for="page in pages"
                    v-if="!simple"
                    :disabled="page === currentPage"
                    class="h-11 w-11 items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 focus:z-10 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 focus-visible:outline-none active:z-10 active:bg-primary-50 active:text-primary-600 active:ring-2 active:ring-primary-100 disabled:bg-gray-50 disabled:text-gray-500"
                    :class="{
                        'inline-flex bg-neutral-200': page === currentPage,
                        'hidden disabled:bg-gray-50 disabled:text-gray-500 md:inline-flex': page !== currentPage,
                    }"
                    @click="typeof page === 'string' ? undefined : changeCurrentPage(page)"
                >
                    {{ page }}
                </button>

                <button
                    :disabled="currentPage >= lastPage"
                    class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 focus-visible:outline-none active:z-10 active:bg-primary-50 active:text-primary-600 active:ring-2 active:ring-primary-100 disabled:bg-gray-50 disabled:text-gray-500"
                    :class="{
                        'rounded-lg': simple,
                        'rounded-r-lg': !simple,
                    }"
                    @click="changeCurrentPage(currentPage + 1)"
                >
                    <span :class="{ 'sr-only': !simple }">{{ t('spartan.sfilters.next') }}</span>
                    <ChevronRightIcon v-if="!simple" class="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </div>
    </div>
</template>
