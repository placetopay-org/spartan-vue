<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    avatar: {
        type: 'text',
        label: 'Has Avatar',
        operators: ['exist', 'notExist'],
    },
} as const;

const value = ref({});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
