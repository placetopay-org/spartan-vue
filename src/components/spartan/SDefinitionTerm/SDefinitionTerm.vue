<script setup lang="ts">
import { hasSlotContent } from '@/helpers';

defineProps<
    Partial<{
        label: string;
        description: string;
    }>
>();
</script>

<template>
    <div
        v-if="(hasSlotContent($slots.default) || label) && (hasSlotContent($slots.description) || description)"
        class="space-y-1"
    >
        <dt class="text-sm font-medium text-gray-500">
            <slot v-if="hasSlotContent($slots.default)" />
            <template v-else>{{ label }}</template>
        </dt>
        <dd class="text-sm text-gray-900">
            <slot v-if="hasSlotContent($slots.description)" name="description" />
            <template v-else>{{ description }}</template>
        </dd>
    </div>
</template>
