<script setup lang="ts">
import { ShieldTickIcon } from '@placetopay/iconsax-vue/bold';
</script>

<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SCard icon="success" iconType="ping" title="Success">
            <template #description>Operation completed.</template>
        </SCard>
        <SCard icon="danger" iconType="ping" title="Danger">
            <template #description>Critical issue detected.</template>
        </SCard>
        <SCard icon="warning" iconType="ping" title="Warning">
            <template #description>Proceed with caution.</template>
        </SCard>
        <SCard icon="info" iconType="ping" title="Info">
            <template #description>Useful context for the user.</template>
        </SCard>
        <SCard :icon="ShieldTickIcon" iconColor="primary" iconType="ping" title="Primary">
            <template #description>Brand-colored highlight via iconColor.</template>
        </SCard>
        <SCard :icon="ShieldTickIcon" iconColor="secondary" iconType="ping" title="Secondary">
            <template #description>Neutral highlight via iconColor.</template>
        </SCard>
    </div>
</template>
