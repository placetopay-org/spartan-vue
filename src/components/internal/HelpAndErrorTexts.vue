<script setup lang="ts">
import { tm } from '@/helpers';
import type { TClassProp } from '@/constants';

defineProps<{
    error?: string;
    help?: string;
    class?: TClassProp;
}>();
</script>

<template>
    <div v-if="help || error" :class="tm('flex flex-col', $props.class)">
        <span v-if="help" class="mt-1 text-xs font-normal text-gray-500">{{ help }}</span>
        <span v-if="error" class="mt-1 text-xs font-normal text-red-500">{{ error }}</span>
    </div>
</template>
