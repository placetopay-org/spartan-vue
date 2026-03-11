<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const value = ref(null);

const { controls } = usePreview({
    props: {
        showIcon: { type: 'boolean', default: true, label: 'showIcon' },
    },
});
</script>

<template>
    <SInputDate v-model="value" :show-icon="controls.showIcon" placeholder="Select a date" />
</template>
