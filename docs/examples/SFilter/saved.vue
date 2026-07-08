<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    status: {
        type: 'options',
        label: 'Status',
        choices: ['active', 'paused', 'archived'],
        operators: ['equal'],
    },
    name: {
        type: 'text',
        label: 'Name',
        operators: ['contains'],
    },
} as const;

const value = ref({});
const saved = ref([
    { name: 'Active only', snapshot: { status: { operator: 'equal', value: 'active' } } },
]);

const onSave = (name: string, snapshot: Record<string, { operator: string; value: any }>) => {
    saved.value = [...saved.value, { name, snapshot }];
};

const onDelete = (name: string) => {
    saved.value = saved.value.filter((s) => s.name !== name);
};

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" :saved="saved" @save="onSave" @delete="onDelete" />
</template>
