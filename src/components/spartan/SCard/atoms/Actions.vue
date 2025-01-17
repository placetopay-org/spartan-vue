<script setup lang="ts">
import type { TCardProps } from '../types';

defineProps<{ actions: TCardProps['actions'] }>();
</script>

<template>
    <hr class="border-gray-200" />
    <section class="flex divide-x divide-gray-200">
        <button
            v-for="action in actions"
            :key="action.text"
            class="flex w-full items-center justify-center gap-2 px-8 py-4 font-medium text-gray-400 hover:bg-gray-50 focus:outline-none"
            @click="action.onClick"
        >
            <component :is="action.icon" class="h-5 w-5" />
            <span>{{ action.text }}</span>
        </button>
    </section>
</template>
