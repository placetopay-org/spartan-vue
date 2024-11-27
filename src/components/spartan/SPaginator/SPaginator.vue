<script setup lang="ts">
import type { TPaginatorProps, TPaginatorEmits } from './types';
import { translator } from '@/helpers';
import { SSelect } from '../SSelect';
import { SButtonGroup, SButtonGroupItem } from '../SButtonGroup';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TPaginatorEmits>();
const { variant = 'numeric', paginatorSize, page, pageSizes, size, hideWhenSinglePage, total } = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

const pages = computed(() => Math.ceil(total / size));
const vPageSizes = computed(() => {
    if (!pageSizes) return;

    let data;

    if (!pageSizes?.includes(size)) {
        data = pageSizes.concat(size).sort((a, b) => a - b);
    }

    if (size > total) {
        data = pageSizes.filter((item) => item < total);
    }

    return data;
});

const quantity = computed(() => Number(paginatorSize) || 0);

const vPages = computed(() => {
    let arr: (string | number)[] = [];

    if (pages.value <= quantity.value * 2 + 5) return pages.value;

    if (page - quantity.value < 4) {
        arr = Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(pages.value);
    } else if (pages.value - page - quantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(quantity.value * 2 + 3)).map(
                (_, i) => pages.value - quantity.value * 2 - 2 + i,
            ),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(1 + quantity.value * 2)).map((_, i) => page - quantity.value + i),
        );
        arr.push('...');
        arr.push(pages.value);
    }

    return arr;
});

const prev = () => {
    if (page === 1) return;
    emit('change', { page: page - 1 });
    emit('update:page', page - 1);
};

const next = () => {
    if (page === pages.value) return;
    emit('change', { page: page + 1 });
    emit('update:page', page + 1);
};

const selectPage = (pageItem: number) => {
    if (pageItem === page) return;
    emit('change', { page: pageItem });
    emit('update:page', pageItem);

};
</script>

<template>
    <div v-if="!hideWhenSinglePage || pages > 1":class="twMerge('flex flex-1 items-center justify-between gap-8', $props.class)">
        <div v-if="pageSizes" class="flex items-center gap-1 text-sm text-gray-700">
            <span>{{ t('showing') }}</span>

            <SSelect
                class="py-1 text-xs"
                :modelValue="size"
                @update:model-value="
                    (value) => {
                        emit('change', { size: Number(value) });
                        emit('update:size', Number(value));
                    }
                "
            >
                <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
                    {{ pageSize }}
                </option>
            </SSelect>

            <span>{{ t('of') }}</span>
            <span class="font-bold">{{ total }}</span>
            <span>{{ t('results') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem first prev class="px-2" @click="prev" />

                <template v-if="variant === 'numeric'">
                    <SButtonGroupItem
                        v-for="pageItem in vPages"
                        class="px-4"
                        :active="Number(pageItem) === page"
                        :key="pageItem"
                        :class="String(pageItem) === '...' ? 'pointer-events-none' : ''"
                        @click="() => Number(pageItem) && selectPage(Number(pageItem))"
                    >
                        {{ pageItem }}
                    </SButtonGroupItem>
                </template>

                <SButtonGroupItem last next class="px-2" @click="next" />
            </SButtonGroup>
        </div>
    </div>
</template>
