<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    brand: {
        type: 'options',
        label: 'Brand',
        choices: [{ id: '1', label: 'Nike' }, 'Adidas', 'Puma', 'Reebok'],
        multiple: true,
        operators: ['equal', 'notEqual'],
    },
    role: {
        type: 'options',
        label: 'Role',
        choices: ['admin', 'editor', 'viewer'],
        operators: ['equal', 'notEqual'],
    },
} as const;

const value = ref({
    brand: { operator: 'equal', value: ['Adidas'] },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
