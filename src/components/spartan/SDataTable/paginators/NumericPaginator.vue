<script setup lang="ts">
import { translator } from '@/helpers';
import { useVueTable } from '@tanstack/vue-table';
import { SSelect } from '../../SSelect';
import { SButtonGroup, SButtonGroupItem } from '../../SButtonGroup';
import { computed } from 'vue';

const props = defineProps<{
    table: ReturnType<typeof useVueTable>;
    size: true | number;
    pagination: { page?: number; count: number; size?: number; sizes?: number[] };
}>();

const { t } = translator('dataTable');

const quantity = computed(() => {
    if (typeof props.size === 'boolean') return 0;
    return props.size;
});
const pageIndex = computed(() => props.table.getState().pagination.pageIndex);
const pageCount = computed(() => props.table.getPageCount());

// const pages = Array.apply(null, Array(props.table.getPageCount())).map((_, i) => i + 1);
const pages = computed(() => {
    let arr: (string | number)[] = [];

    if (pageCount.value <= quantity.value * 2 + 5) return pageCount.value;

    if (pageIndex.value - quantity.value < 3) {
        arr = Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(pageCount.value);
    } else if (pageCount.value - pageIndex.value - quantity.value < 4) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(quantity.value * 2 + 3)).map(
                (_, i) => pageCount.value - quantity.value * 2 - 2 + i,
            ),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(1 + quantity.value * 2)).map((_, i) => pageIndex.value + 1 - quantity.value + i),
        );
        arr.push('...');
        arr.push(pageCount.value);
    }

    return arr;
});
</script>

<template>
    <div class="flex flex-1 items-center justify-between gap-8">
        <div v-if="$props.pagination?.sizes" class="flex items-center gap-1 text-sm text-gray-700">
            <span>{{ t('showing') }}</span>

            <SSelect
                class="py-1 text-xs"
                v-if="pagination?.sizes"
                :modelValue="table.getState().pagination.pageSize"
                @update:model-value="
                    (value) => {
                        table.setPageSize(Number(value));
                    }
                "
            >
                <option v-for="pageSize in $props.pagination.sizes" :key="pageSize" :value="pageSize">
                    {{ pageSize }}
                </option>
            </SSelect>

            <span>{{ t('results') }}</span>
            <span>{{ t('of') }}</span>
            <span class="font-bold">{{ pageCount }}</span>
            <span>{{ t('pages') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem first prev class="px-2" @click="() => table.previousPage()" />

                <SButtonGroupItem
                    v-for="page in pages"
                    class="px-4"
                    :active="Number(page) === table.getState().pagination.pageIndex + 1"
                    :key="page"
                    :class="String(page) === '...' && 'pointer-events-none'"
                    @click="() => Number(page) && table.setPageIndex(Number(page) - 1)"
                >
                    {{ page }}
                </SButtonGroupItem>

                <SButtonGroupItem last next class="px-2" @click="() => table.nextPage()" />
            </SButtonGroup>
        </div>
    </div>
</template>
