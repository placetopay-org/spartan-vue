<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { createContext } from './api';
import { tableStyles } from './styles';
import type { TDTableProps, TDTableEmits } from './types';
import { usePassthrough } from '@/helpers';
import TableHead from './atoms/TableHead/TableHead.vue';
import TableBody from './atoms/TableBody/TableBody.vue';
import TablePaginator from './atoms/TablePaginator/TablePaginator.vue';
import { useSlots } from 'vue';

const emit = defineEmits<TDTableEmits>();
const props = defineProps<TDTableProps>();
const slots = useSlots();

createContext(props, emit, slots);

const { pt, extractor } = usePassthrough();

const [tableClass, tableProps] = extractor(pt.value.table);
const PtThead = extractor(pt.value.thead);
const PtPaginator = extractor(pt.value.paginator);
</script>

<template>
    <slot />
    <div :class="twMerge(tableStyles({ borderless }), $props.class)">
        <div class="overflow-auto">
            <table data-s-table v-bind="tableProps" :class="twMerge('w-full', tableClass)">
                <TableHead v-bind="{ PtThead }" />
                <TableBody />
                <!-- <template #expansion="{ row }">
                        <slot name="expansion" v-bind="{ row }" />
                    </template>
                </TableBody> -->
            </table>
        </div>

        <TablePaginator v-if="props.paginator" v-bind="{ PtPaginator }" />
    </div>
</template>
