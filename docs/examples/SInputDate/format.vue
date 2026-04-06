<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const value = ref(null);

const { controls } = usePreview({
    props: {
        dateFormat: {
            type: 'select',
            options: ['dd/mm/yy', 'mm/dd/yy', 'yy-mm-dd'],
            default: 'dd/mm/yy',
            label: 'dateFormat',
        },
    },
});
</script>

<template>
    <SInputDate v-model="value" :date-format="controls.dateFormat" placeholder="Select a date" />
</template>
