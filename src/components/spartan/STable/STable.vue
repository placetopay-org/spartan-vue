<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { createContext } from './api';
import type { TTableProps } from './types';
import { STableBody, STableHead, STableHeadCell, STableRow, STableCell } from '.';

const props = defineProps<Partial<TTableProps>>();

const context = createContext(props);
</script>

<template>
    <table
        :class="
            twMerge(
                'w-full divide-y divide-gray-300',
                !borderless && 'overflow-hidden rounded-2xl shadow',
                $props.class,
            )
        "
    >
        <STableHead v-if="context.autoCols">
            <STableHeadCell v-for="col in context.autoCols" :key="col">
                {{ col }}
            </STableHeadCell>
        </STableHead>

        <STableBody v-if="context.autoRows">
            <STableRow v-for="row in context.autoRows" :key="row">
                <STableCell v-for="(cell, index) in row" :key="cell" :highlight="props.highlight?.includes(index)">
                    {{ cell }}
                </STableCell>
            </STableRow>
        </STableBody>

        <slot />
    </table>
</template>
