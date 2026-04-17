<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SDTable',
});

const data = ref([
    { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer', role: 'Member' },
    { name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer', role: 'Admin' },
    { name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product', role: 'Member' },
    { name: 'Whitney Francis', email: 'whitney.francis@example.com', title: 'Copywriter', role: 'Admin' },
    { name: 'Leonard Krasner', email: 'leonard.krasner@example.com', title: 'Senior Designer', role: 'Owner' },
]);

const paginator = ref({
    page: 1,
    size: 10,
    total: 50,
    pageSizes: [10, 25, 50],
});

const handlePaginatorChange = (event: { page?: number; size?: number; dir?: 'prev' | 'next' }) => {
    if (event.page) paginator.value.page = event.page;
    if (event.size) paginator.value.size = event.size;
};
</script>

<template>
    <SDTable :data="data" :paginator="paginator" @paginator-change="handlePaginatorChange">
        <SDColumn field="name" header="Name" />
        <SDColumn field="email" header="Email" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />
    </SDTable>
</template>
