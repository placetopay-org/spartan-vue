<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import { computed, useSlots } from 'vue';
import type { TDefinitionTermProps } from './types';

defineProps<Partial<TDefinitionTermProps>>();

const slots = useSlots();
const slotLabels = computed(() => Object.keys(slots).filter((key) => key.match(/^\d+$/)));
</script>

<template>
    <div class="space-y-1">
        <dt v-if="hasSlotContent($slots.default)" class="text-sm font-medium text-gray-500">
            <slot />
        </dt>

        <dt v-else-if="typeof labels === 'string'" class="text-sm font-medium text-gray-500">{{ labels }}</dt>

        <template v-else-if="Array.isArray(labels)">
            <dt v-for="label in labels" :key="label" class="text-sm font-medium text-gray-500">
                {{ label }}
            </dt>
        </template>

        <template v-if="slotLabels.length">
            <dt v-for="label in slotLabels" :key="label" class="text-sm font-medium text-gray-500">
                <slot :name="label" />
            </dt>
        </template>

        <dd class="text-sm text-gray-900">
            <slot v-if="hasSlotContent($slots.description)" name="description" />
            <template v-else>{{ description }}</template>
        </dd>
    </div>
</template>
