<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        loading: { type: 'boolean', default: true, label: 'loading' },
    },
})

const data = ref([
    { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer', role: 'Member' },
    { name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer', role: 'Admin' },
    { name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product', role: 'Member' },
])
</script>

<template>
    <SDTable :data="data" :loading="controls.loading">
        <SDColumn field="name" header="Name" />
        <SDColumn field="email" header="Email" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />
    </SDTable>
</template>
