<script setup lang="ts">
import { translator } from '@/helpers';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/20/solid';
import { useVueTable } from '@tanstack/vue-table';
import { SPopover } from '../../SPopover';
import { SSelect } from '../../SSelect';

defineProps<{
    table: ReturnType<typeof useVueTable>;
    pagination: { page?: number; count: number; size?: number; sizes?: number[] };
}>();

const { t } = translator('dataTable');

const currentPage = 1;
const goToPage = (page: number) => {
    console.log(page);
};
const pages = [1, 2, 3, 4, 5];
const lastPage = 5;
</script>

<template>
    <!-- <div class="flex items-center gap-1">
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
    </div> -->

    <div class="flex flex-1 items-center justify-between">
        <div>
            <div class="flex items-center gap-1 text-sm text-gray-700">
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
                    <option v-for="pageSize in $props.pagination?.sizes" :key="pageSize" :value="pageSize">
                        {{ pageSize }}
                    </option>
                </SSelect>

                <!-- <SPopover :offset="4">
                    <template #reference="{ toggle }">
                        <button
                            @click="toggle"
                            class="flex rounded border border-gray-300 bg-white py-0.5 pl-1.5 pr-0.5 font-bold text-gray-500 hover:bg-gray-50"
                        >
                            {{ table.getState().pagination.pageSize }}
                            <ChevronDownIcon class="h-5" />
                        </button>
                    </template>

                    <template #default="{ close }">
                        <div
                            class="h-full w-full divide-y cursor-pointer list-none overflow-auto rounded border border-gray-300 bg-white py-1 text-center"
                        >
                            <li
                                class="px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                v-for="pageSize in $props.pagination?.sizes"
                                :key="pageSize"
                                :value="pageSize"
                            >
                                <button
                                    @click="
                                        () => {
                                            table.setPageSize(Number(pageSize));
                                            close();
                                        }
                                    "
                                >
                                    {{ pageSize }}
                                </button>
                            </li>
                        </div>
                    </template>
                </SPopover> -->
                <span>{{ t('of') }}</span>
                <span class="font-bold">{{ ` ${20} ` }}</span>
                <span>{{ t('results') }}</span>
            </div>
        </div>
        <div>
            <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <div
                    class="relative inline-flex cursor-pointer select-none items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    @click="currentPage > 1 ? goToPage(currentPage - 1) : ''"
                >
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5" />
                </div>

                <div
                    v-for="page in pages"
                    :key="page"
                    :class="[
                        'relative inline-flex cursor-pointer select-none items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
                        page === currentPage ? 'bg-gray-100' : '',
                    ]"
                    @click="goToPage(page)"
                >
                    {{ page }}
                </div>

                <div
                    class="relative inline-flex cursor-pointer select-none items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    @click="currentPage < lastPage ? goToPage(currentPage + 1) : ''"
                >
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5" />
                </div>
            </nav>
        </div>
    </div>
</template>
