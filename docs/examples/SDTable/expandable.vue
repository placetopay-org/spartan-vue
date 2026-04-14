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
]);
</script>

<template>
    <SDTable :data="data">
        <SDColumn :expander="true" />
        <SDColumn field="name" header="Name" />
        <SDColumn field="email" header="Email" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />

        <template #expansion="{ row }">
            <div class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Details for {{ row.name }}:</strong></p>
                <p>Email: {{ row.email }}</p>
                <p>Title: {{ row.title }}</p>
                <p>Role: {{ row.role }}</p>
            </div>
        </template>
    </SDTable>
</template>
