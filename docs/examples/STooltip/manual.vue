<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

usePreview({ component: 'STooltip' });

const tooltip = ref();
</script>

<template>
    <div class="flex items-center gap-4">
        <STooltip ref="tooltip" title="Manually controlled tooltip" :manual="true">
            <SBadge>Hover won't work</SBadge>
        </STooltip>

        <SButton size="sm" @click="tooltip?.open()">Open</SButton>
        <SButton size="sm" variant="secondary" @click="tooltip?.close()">Close</SButton>
        <SButton size="sm" variant="secondary" outline @click="tooltip?.toggle()">Toggle</SButton>
    </div>
</template>
