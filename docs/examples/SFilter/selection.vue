<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    tags: {
        type: 'selection',
        label: 'Tags',
        operators: ['equal', 'notEqual'],
    },
} as const;

const value = ref({});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
