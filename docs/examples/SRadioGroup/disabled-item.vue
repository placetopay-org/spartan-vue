<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const selected = ref('available');
usePreview({});
</script>

<template>
    <SRadioGroup v-model="selected">
        <SRadioGroupItem value="available">
            <template #title>Available plan</template>
            <template #description>8GB / 4 CPUs</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="unavailable" disabled>
            <template #title>Unavailable plan</template>
            <template #description>Sold out</template>
        </SRadioGroupItem>
    </SRadioGroup>
</template>
