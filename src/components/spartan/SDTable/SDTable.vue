<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { createContext } from './api';
import { cellStyles, tableStyles } from './styles';
import type { TDTableProps } from './types';

const props = defineProps<TDTableProps>();

const context = createContext(props);

console.log(context);
console.log(props.data);
</script>

<template>
    <table :class="twMerge(tableStyles({ borderless }), $props.class)">
        <thead :class="twMerge('border-b border-gray-300 bg-gray-50')">
            <th
                v-for="(col, idx) in context.colsArray"
                :key="idx"
                scope="col"
                :class="twMerge(cellStyles({ head: true }))"
            >
                {{ col.header || '' }}
            </th>
        </thead>

        <tbody :class="twMerge('divide-y divide-gray-200 bg-white')">
            <tr v-for="(row, idx) in props.data" :key="idx">
                <td v-for="col in context.colsArray" :class="twMerge(cellStyles())">
                    {{ row[col.field] }}
                </td>
            </tr>
        </tbody>
    </table>

    <slot />
</template>
