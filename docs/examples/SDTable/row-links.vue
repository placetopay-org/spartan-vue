<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SDTable',
});

const data = ref([
    { id: 1, name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer' },
    { id: 2, name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer' },
    { id: 3, name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product' },
]);

const getRowLink = (row: Record<string, any>) => `/users/${row.id}`;
</script>

<template>
    <SDTable :data="data" :row-link="getRowLink">
        <SDColumn field="name" header="Name" />
        <SDColumn field="email" header="Email" />
        <SDColumn field="title" header="Title" />
    </SDTable>
</template>
