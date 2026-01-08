<script setup lang="ts">
import { SSkeleton } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { cellStyles } from '../styles';

defineProps<{
    cols: any[];
    slim: boolean;
}>();
</script>

<template>
    <tr>
        <td v-for="(col, index) in cols" :key="`row1-${index}`" :class="twMerge(cellStyles({ slim }))">
            <SSkeleton class="h-5 w-full" />
        </td>
    </tr>
    <tr>
        <td v-for="(col, index) in cols" :key="`row2-${index}`" :class="twMerge(cellStyles({ slim }))">
            <SSkeleton class="h-5 w-1/2" />
        </td>
    </tr>
    <tr>
        <td v-for="(col, index) in cols" :key="`row3-${index}`" :class="twMerge(cellStyles({ slim }))">
            <SSkeleton class="h-5 w-3/4" />
        </td>
    </tr>
</template>
