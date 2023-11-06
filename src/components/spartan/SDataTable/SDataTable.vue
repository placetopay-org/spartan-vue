<script setup lang="ts">
import { Fragment, ref } from 'vue';
import { STable, STableHead, STableBody, STableRow, STableCell, STableHeadCell } from '../STable';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
    cols: any[];
    rows: any[];
    loading?: boolean;
    sortable?: boolean | number;
}>();

const sortTarget = ref(typeof props.sortable === 'number' ? props.sortable : props.sortable ? 0 : null);
</script>

<template>
    <STable>
        <STableHead>
            <STableHeadCell v-for="(col, index) of cols">
                <button v-if="index === sortTarget" class="flex items-center gap-2 group hover:text-primary-600 duration-100">
                    <slot :name="`head(${col})`" :value="col">
                        {{ col }}
                    </slot>
                    <ChevronDownIcon class="h-5 w-5 group-active:bg-primary-100 rounded" />
                </button>
                <slot v-else :name="`head(${col})`" :value="col">
                    {{ col }}
                </slot>
            </STableHeadCell>
        </STableHead>

        <STableBody>
            <STableRow v-for="row in rows" v-if="!loading">
                <STableCell v-for="index in cols.length">
                    <slot :name="`col[${index - 1}]`" :value="row[index - 1]">
                        {{ row[index - 1] }}
                    </slot>
                </STableCell>
            </STableRow>
            <STableRow v-else>
                <STableCell :colspan="cols.length">
                    <div class="w-full text-center">
                        {{ 'spartan.sDataTable.processing' }}
                    </div>
                </STableCell>
            </STableRow>
        </STableBody>
    </STable>
</template>
