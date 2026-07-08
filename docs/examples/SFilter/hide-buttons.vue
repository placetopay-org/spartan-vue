<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    name: {
        type: 'text',
        label: 'Name',
        operators: ['equal', 'contains'],
    },
} as const;

const value = ref({
    name: { operator: 'contains', value: 'John' },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" :hide-apply-button="false" :hide-clear-button="false" />
</template>
