<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    reference: {
        type: 'text',
        label: 'Reference',
        operators: ['equal'],
        customOperators: [{ id: 'customSearch', label: 'Search by ref', tag: (v: any) => `Ref: ${v}` }],
    },
} as const;

const value = ref({
    reference: { operator: 'customSearch', value: 'ABC-123' },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
