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
    laravel,
    inertiaRouter,
} = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

const vQuantity = computed(() => Number(paginatorSize) || 0);

const vTotal = computed(() => {
    if (total) return total;
    if (laravel?.total) return laravel.total;
});

const vSize = computed(() => {
    if (size) return size;
    if (laravel?.per_page) return laravel.per_page;
});

const vCount = computed(() => {
    if (count) return count;
    if (laravel?.last_page) return laravel.last_page;

    if (vTotal.value && vSize.value) return Math.ceil(vTotal.value / vSize.value);
});

const vPageSizes = computed(() => {
    if (!pageSizes || !vSize.value) return;

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

    if (!data.includes(vSize.value)) {
        data.push(vSize.value);
        data.sort((a, b) => a - b);
    }

    return data;
});

const vPage = computed(() => {
    if (page) return page;

    if (laravel?.current_page) return laravel.current_page;
});

const vPages = computed(() => {
    if (!vCount.value || !vPage.value) return [];

    let arr: (string | number)[] = [];

    if (vCount.value <= vQuantity.value * 2 + 5) return vCount.value;

    if (vPage.value - vQuantity.value < 4) {
        arr = Array.apply(null, Array(vQuantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(vCount.value);
    } else if (vCount.value - vPage.value - vQuantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(vQuantity.value * 2 + 3)).map((_, i) => vCount.value! - vQuantity.value * 2 - 2 + i),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(Array.apply(null, Array(1 + vQuantity.value * 2)).map((_, i) => vPage.value! - vQuantity.value + i));
        arr.push('...');
        arr.push(vCount.value);
    }

    return arr;
});

const vCanGoPrev = computed(() => {
    if (canGoPrev !== undefined) return canGoPrev;
    return Boolean(vPage.value && vPage.value > 1);
});

const vCanGoNext = computed(() => {
    if (canGoNext !== undefined) return canGoNext;
    return Boolean(vPage.value && vCount.value && vPage.value < vCount.value);
});

const prev = () => {
    if (laravel?.prev_page_url) {
        if (inertiaRouter) {
            inertiaRouter.visit(laravel.prev_page_url);
        } else {
            window.location.href = laravel.prev_page_url;
        }
        return;
    }

    if (!vPage.value || vPage.value === 1) {
        emit('change', { dir: 'prev' });
        return;
    }
    emit('change', { page: vPage.value - 1, dir: 'prev' });
    emit('update:page', vPage.value - 1);
};

const next = () => {
    if (laravel?.next_page_url) {
        if (inertiaRouter) {
            inertiaRouter.visit(laravel.next_page_url);
        } else {
            window.location.href = laravel.next_page_url;
        }
        return;
    }

    if (!vPage.value || vPage.value === vCount.value) {
        emit('change', { dir: 'next' });
        return;
    }
    emit('change', { page: vPage.value + 1, dir: 'next' });
    emit('update:page', vPage.value + 1);
};

const selectPage = (pageItem: number) => {
    const link = laravel?.links?.find((link) => link.label === pageItem.toString());
    if (link?.url) {
        if (inertiaRouter) {
            inertiaRouter.visit(link.url);
        } else {
            window.location.href = link.url;
        }
        return;
    }

    if (pageItem === vPage.value) return;
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
                :model-value="vSize"
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
                        :active="Number(pageItem) === vPage"
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
