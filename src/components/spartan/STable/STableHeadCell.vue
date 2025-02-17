<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import type { TTableHeadCellProps } from './types';

defineProps<TTableHeadCellProps>();

const context = useContext('STableHeadCell');
context.register('col');
</script>

<template>
    <th
        scope="col"
        :class="twMerge('p-3.5 text-left text-sm font-semibold text-gray-900 first:pl-5 last:pr-5', $props.class)"
    >
        <slot />
    </th>
</template>
