<script setup lang="ts">
import type { TPaginatorProps, TPaginatorEmits } from './types';
import { translator } from '@/helpers';
import { SSelect } from '@spartan';
import { SButtonGroup, SButtonGroupItem } from '../SButtonGroup';
import { computed, ref } from 'vue';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TPaginatorEmits>();
const {
    paginatorSize,
    page,
    pageSizes,
    size,
    count,
    hideWhenSinglePage,
    total,
    canGoPrev = undefined,
    canGoNext = undefined,
} = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

const vCount = computed(() => count || (total && size && Math.ceil(total / size)));
const vPageSizes = computed(() => {
    if (!pageSizes || !size) return;

    let data = [...pageSizes];

    if (total) {
        data = [];

        for (const item of pageSizes) {
            if (item >= total) {
                data.push(total);
                break;
            }
            data.push(item);
        }
    }

    if (!data.includes(size)) {
        data.push(size);
        data.sort((a, b) => a - b);
    }

    return data;
});

const quantity = computed(() => Number(paginatorSize) || 0);

const vPages = computed(() => {
    if (!vCount.value || !page) return [];

    let arr: (string | number)[] = [];

    if (vCount.value <= quantity.value * 2 + 5) return vCount.value;

    if (page - quantity.value < 4) {
        arr = Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(vCount.value);
    } else if (vCount.value - page - quantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => vCount.value! - quantity.value * 2 - 2 + i),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(Array.apply(null, Array(1 + quantity.value * 2)).map((_, i) => page - quantity.value + i));
        arr.push('...');
        arr.push(vCount.value);
    }

    return arr;
});

const vCanGoPrev = computed(() => {
    if (canGoPrev !== undefined) return canGoPrev;
    return Boolean(page && page > 1);
});

const vCanGoNext = computed(() => {
    if (canGoNext !== undefined) return canGoNext;
    return Boolean(page && vCount.value && page < vCount.value);
});

const prev = () => {
    if (!page || page === 1) {
        emit('change', { dir: 'prev' });
        return;
    }
    emit('change', { page: page - 1, dir: 'prev' });
    emit('update:page', page - 1);
};

const next = () => {
    if (!page || page === vCount.value) {
        emit('change', { dir: 'next' });
        return;
    }
    emit('change', { page: page + 1, dir: 'next' });
    emit('update:page', page + 1);
};

const selectPage = (pageItem: number) => {
    if (pageItem === page) return;
    emit('change', { page: pageItem });
    emit('update:page', pageItem);
};
</script>

<template>
    <div
        v-if="!hideWhenSinglePage || (vCount && vCount > 1)"
        :class="twMerge('flex flex-1 items-center justify-between gap-8', $props.class)"
    >
        <div v-if="vPageSizes" class="flex items-center gap-1 text-sm text-gray-700">
            <span>{{ t('showing') }}</span>

            <SSelect
                class="h-8 text-xs"
                :model-value="size"
                @update:model-value="
                    (value) => {
                        emit('change', { size: Number(value), page: 1 });
                        emit('update:size', Number(value));
                        emit('update:page', 1);
                    }
                "
            >
                <option v-for="pageSize in vPageSizes" :key="pageSize" :value="pageSize">
                    {{ pageSize }}
                </option>
            </SSelect>

            <template v-if="total">
                <span>{{ t('of') }}</span>
                <span class="font-bold">{{ total }}</span>
            </template>
            <span>{{ t('results') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem first prev class="px-2" :disabled="!vCanGoPrev" @click="prev" />

                <template v-if="!hideNumbers">
                    <SButtonGroupItem
                        v-for="pageItem in vPages"
                        :key="pageItem"
                        class="px-4"
                        :active="Number(pageItem) === page"
                        :class="String(pageItem) === '...' ? 'pointer-events-none' : ''"
                        @click="() => Number(pageItem) && selectPage(Number(pageItem))"
                    >
                        {{ pageItem }}
                    </SButtonGroupItem>
                </template>

                <SButtonGroupItem last next class="px-2" :disabled="!vCanGoNext" @click="next" />
            </SButtonGroup>
        </div>
    </div>
</template>
