<script setup lang="ts">
import {
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/20/solid';
import { useVueTable } from '@tanstack/vue-table';
import { SSelect } from '../..';
import { translator } from '@/helpers';

defineProps<{
    table: ReturnType<typeof useVueTable>;
    pagination: { page?: number; count: number; size?: number; sizes?: number[] };
}>();

const { t } = translator('dataTable');
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="flex items-center gap-1">
            <button
                class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                @click="() => table.setPageIndex(0)"
                :disabled="!table.getCanPreviousPage()"
            >
                <ChevronDoubleLeftIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
            </button>
            <button
                class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                @click="() => table.previousPage()"
                :disabled="!table.getCanPreviousPage()"
            >
                <ChevronLeftIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
            </button>
            <button
                class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                @click="() => table.nextPage()"
                :disabled="!table.getCanNextPage()"
            >
                <ChevronRightIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
            </button>
            <button
                class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                @click="() => table.setPageIndex(table.getPageCount() - 1)"
                :disabled="!table.getCanNextPage()"
            >
                <ChevronDoubleRightIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
            </button>
        </div>

        <div class="flex items-center gap-2">
            <span>{{ t('page') }}</span>
            <div class="flex items-center gap-2 font-bold">
                {{ table.getState().pagination.pageIndex + 1 }}
                <span class="font-normal">{{ t('of') }}</span>
                {{ table.getPageCount() }}
            </div>
        </div>

        <SSelect
            class="ml-auto py-1 text-sm"
            v-if="pagination?.sizes"
            :modelValue="table.getState().pagination.pageSize"
            @update:model-value="
                (value) => {
                    table.setPageSize(Number(value));
                }
            "
        >
            <option v-for="pageSize in $props.pagination?.sizes" :key="pageSize" :value="pageSize">
                {{ `${t('pageSizePrefix')} ${pageSize}` }}
            </option>
        </SSelect>
    </div>
</template>
