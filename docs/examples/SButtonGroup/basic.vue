<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const active = ref('Months');

usePreview({
    mode: 'playground',
    component: 'SButtonGroup',
    imports: { ref: 'vue' },
    data: {
        active: { expression: "ref('Months')" },
    },
});
</script>

<template>
    <SButtonGroup>
        <SButtonGroupItem :first="true" :active="active === 'Years'" @click="active = 'Years'">
            Years
        </SButtonGroupItem>
        <SButtonGroupItem :active="active === 'Months'" @click="active = 'Months'">Months</SButtonGroupItem>
        <SButtonGroupItem :last="true" :active="active === 'Days'" @click="active = 'Days'">Days</SButtonGroupItem>
    </SButtonGroup>
</template>
