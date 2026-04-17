<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SMultiSelector',
});

const selected = ref<string[]>([]);
const options = ref(['Vue', 'React', 'Angular', 'Svelte']);

const handleAdd = (newOption: Record<string, any>) => {
    const label = String(newOption);
    if (!options.value.includes(label)) {
        options.value.push(label);
        selected.value.push(label);
    }
};
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        :search="true"
        :handler="true"
        placeholder="Select or add frameworks"
        @add="handleAdd"
    />
</template>
