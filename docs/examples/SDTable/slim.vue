<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        slim: { type: 'boolean', default: true, label: 'slim' },
    },
});

const data = ref([
    { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer', role: 'Member' },
    { name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer', role: 'Admin' },
    { name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product', role: 'Member' },
    { name: 'Whitney Francis', email: 'whitney.francis@example.com', title: 'Copywriter', role: 'Admin' },
    { name: 'Leonard Krasner', email: 'leonard.krasner@example.com', title: 'Senior Designer', role: 'Owner' },
]);
</script>

<template>
    <SDTable :data="data" :slim="controls.slim">
        <SDColumn field="name" header="Name" />
        <SDColumn field="email" header="Email" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />
    </SDTable>
</template>
