<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'STable',
});

const cols = ['Name', 'Email', 'Role'];
const rows = [
    ['Alice Johnson', 'alice@example.com', 'Admin'],
    ['Bob Smith', 'bob@example.com', 'Editor'],
    ['Carol Davis', 'carol@example.com', 'Viewer'],
];
</script>

<template>
    <STable :cols="cols" :rows="rows" :highlight="[0]" />
</template>
