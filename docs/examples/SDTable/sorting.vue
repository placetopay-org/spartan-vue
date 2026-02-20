<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

usePreview({
    component: 'SDTable',
})

const data = ref([
    { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', title: 'Front-end Developer', role: 'Member' },
    { name: 'Courtney Henry', email: 'courtney.henry@example.com', title: 'Designer', role: 'Admin' },
    { name: 'Tom Cook', email: 'tom.cook@example.com', title: 'Director of Product', role: 'Member' },
    { name: 'Whitney Francis', email: 'whitney.francis@example.com', title: 'Copywriter', role: 'Admin' },
])

const handleSort = (sortEvent: { field?: string | symbol; sort?: 'asc' | 'des' | boolean }) => {
    console.log('Sort event:', sortEvent)
}
</script>

<template>
    <SDTable :data="data" @sort="handleSort">
        <SDColumn field="name" header="Name" :sort="true" />
        <SDColumn field="email" header="Email" :sort="true" />
        <SDColumn field="title" header="Title" />
        <SDColumn field="role" header="Role" />
    </SDTable>
</template>
