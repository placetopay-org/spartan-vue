<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const selected = ref('basic');

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
});
</script>

<template>
    <SRadioGroup v-model="selected" :disabled="controls.disabled">
        <SRadioGroupItem value="basic">
            <template #title>Basic</template>
            <template #description>4GB / 2 CPUs</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="standard">
            <template #title>Standard</template>
            <template #description>8GB / 4 CPUs</template>
        </SRadioGroupItem>
    </SRadioGroup>
</template>
