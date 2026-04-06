<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const colorMode = useColorMode();

const mode = computed({
    get() {
        return colorMode.preference as 'system' | 'light' | 'dark';
    },
    set(value: 'system' | 'light' | 'dark') {
        colorMode.preference = value;
    },
});

usePreview({
    mode: 'playground',
    component: 'SColorSwitch',
});
</script>

<template>
    <SColorSwitch v-model="mode" />
</template>
