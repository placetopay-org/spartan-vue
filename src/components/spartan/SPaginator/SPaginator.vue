<script setup lang="ts">
import type { TPaginatorProps, TPaginatorEmits } from './types';
import { translator } from '@/helpers';
import { SSelect } from '../SSelect';
import { SButtonGroup, SButtonGroupItem } from '../SButtonGroup';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TPaginatorEmits>();
const { variant = 'numeric', paginatorSize, count, page, pageSizes, size } = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

const quantity = computed(() => Number(paginatorSize) || 0);

const pages = computed(() => {
    let arr: (string | number)[] = [];

    if (count <= quantity.value * 2 + 5) return count;

    if (page - quantity.value < 4) {
        arr = Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(count);
    } else if (count - page - quantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(quantity.value * 2 + 3)).map(
                (_, i) => count - quantity.value * 2 - 2 + i,
            ),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(1 + quantity.value * 2)).map((_, i) => page - quantity.value + i),
        );
        arr.push('...');
        arr.push(count);
    }

    return arr;
});

const prev = () => {
    if (page === 1) return;
    emit('change', { page: page - 1 });
    emit('update:page', page - 1);
};

const next = () => {
    if (page === count) return;
    emit('change', { page: page + 1 });
    emit('update:page', page + 1);
};

const selectPage = (page: number) => {
    emit('change', { page });
    emit('update:page', page);

};
</script>

<template>
    <div :class="twMerge('flex flex-1 items-center justify-between gap-8', $props.class)">
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

            <span>{{ t('results') }}</span>
            <span>{{ t('of') }}</span>
            <span class="font-bold">{{ count }}</span>
            <span>{{ t('pages') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem first prev class="px-2" @click="prev" />

                <template v-if="variant === 'numeric'">
                    <SButtonGroupItem
                        v-for="pageItem in pages"
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
