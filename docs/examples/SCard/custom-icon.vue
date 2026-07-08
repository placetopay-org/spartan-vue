<script setup lang="ts">
import { ShieldTickIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        iconColor: {
            type: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            default: 'primary',
            label: 'iconColor',
        },
        iconType: { type: 'select', options: ['solid', 'ping'], default: 'solid', label: 'iconType' },
    },
});
</script>

<template>
    <SCard :icon="ShieldTickIcon" :icon-color="controls.iconColor" :icon-type="controls.iconType" title="Secured">
        <template #description>Your account is protected.</template>
    </SCard>
</template>
