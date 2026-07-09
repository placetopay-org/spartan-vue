<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SDTable',
});

type SortDirection = 'asc' | 'des';
type Person = {
    name: string;
    email: string;
    title: string;
    role: string;
};

const data = ref<Person[]>([
    { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer', role: 'Member' },
    { name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer', role: 'Admin' },
    { name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product', role: 'Member' },
    { name: 'Whitney Francis', email: 'whitney.francis@example.com', title: 'Copywriter', role: 'Admin' },
]);

const sortState = ref<{ field: keyof Person; direction: SortDirection } | null>(null);

const sortedData = computed(() => {
    if (!sortState.value) return data.value;

    const { field, direction } = sortState.value;
    return [...data.value].sort((a, b) => {
        return direction === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
    });
});

const columnSort = (field: keyof Person) => (sortState.value?.field === field ? sortState.value.direction : true);

const handleSort = (sortEvent: { field?: string | symbol; sort?: 'asc' | 'des' | boolean }) => {
    if (typeof sortEvent.field !== 'string') return;

    const field = sortEvent.field as keyof Person;
    const direction = sortState.value?.field === field && sortState.value.direction === 'asc' ? 'des' : 'asc';
    sortState.value = { field, direction };
};
</script>

<template>
    <SDTable :data="sortedData" @sort="handleSort">
        <SDColumn field="name" header="Name" :sort="columnSort('name')" />
        <SDColumn field="email" header="Email" :sort="columnSort('email')" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />
    </SDTable>
</template>
