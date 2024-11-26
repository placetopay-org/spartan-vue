<script setup lang="ts">
import { SPaginator } from '@spartan';
import { Wrapper } from '@internal';
import { twMerge } from 'tailwind-merge';
import { createContext } from './api';
import { cellStyles, tableStyles } from './styles';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import type { TDColumnProps, TDTableProps, TDTableEmits } from './types';

const emit = defineEmits<TDTableEmits>();
const props = defineProps<TDTableProps>();
const { rowLink = () => {}, pagination } = props;

const context = createContext(props);

const sort = ({ field, sort }: TDColumnProps) => {
    if (!sort) return;

    emit('sort', { field, sort });
};
</script>

<template>
    <div :class="twMerge(tableStyles({ borderless }), $props.class)">
        <table class="w-full">
            <slot />
            <thead class="border-b border-gray-300 bg-gray-50">
                <th v-for="col in context.colsArray" scope="col" :class="twMerge(cellStyles({ head: true }))">
                    <Wrapper :as="col.sort ? 'button' : 'div'" @click="sort(col)" class="flex w-fit group">
                        <template v-if="col.slots?.header">
                            <component v-for="slot in col.slots.header()" :is="slot" />
                        </template>

                        <template v-else>
                            {{ col.header || '' }}
                        </template>

                        <span
                            class="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300"
                        >
                            <component
                                v-if="col.sort"
                                :is="col.sort === 'asc' ? ChevronUpIcon : ChevronDownIcon"
                                class="h-5 w-5"
                            />
                        </span>
                    </Wrapper>
                </th>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="row in props.data" :class="rowLink(row) && 'hover:bg-gray-100'">
                    <td v-for="col in context.colsArray" :class="twMerge((!rowLink(row) || col.noLink) && cellStyles())">
                        <Wrapper
                            :as="!!rowLink(row) && !col.noLink && 'a'"
                            :href="rowLink(row)"
                            :class="twMerge(cellStyles(), 'block h-full w-full')"
                        >
                            <template v-if="col.slots?.body">
                                <component v-for="slot in col.slots.body({ row, value: row[col.field] })" :is="slot" />
                            </template>

                            <template v-else>
                                {{ row[col.field] }}
                            </template>
                        </Wrapper>
                    </td>
                </tr>
            </tbody>
        </table>

        <section v-if="props.pagination" class="p-[14px] border-t border-gray-300 bg-gray-50">
            <SPaginator :class="props.pagination.pageSizes ? '': 'justify-end'" v-bind="props.pagination" @change="newState => $emit('paginationChange', newState)" />
        </section>
    </div>
</template>
