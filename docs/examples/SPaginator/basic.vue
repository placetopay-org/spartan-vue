<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const page = ref(1);

const { controls } = usePreview({
    mode: 'playground',
    component: 'SPaginator',
    props: {
        total: { type: 'number', default: 100, min: 0, step: 10, label: 'total', required: true },
        size: { type: 'number', default: 10, min: 1, step: 5, label: 'size', required: true },
        hideNumbers: { type: 'boolean', default: false, label: 'hideNumbers' },
    },
    imports: { ref: 'vue' },
    data: {
        page: { expression: 'ref(1)' },
    },
    staticAttrs: {
        'v-model:page': 'page',
    },
});
</script>

<template>
    <SPaginator
        v-model:page="page"
        :size="controls.size"
        :total="controls.total"
        :hide-numbers="controls.hideNumbers"
    />
</template>
