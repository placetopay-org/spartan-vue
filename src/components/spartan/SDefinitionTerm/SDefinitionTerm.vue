<script setup lang="ts">
import { Wrapper } from '@internal';
import { hasSlotContent, usePassthrough } from '@/helpers';
import { computed, useSlots } from 'vue';
import type { TDefinitionTermProps } from './types';
import { twMerge } from 'tailwind-merge';

defineProps<TDefinitionTermProps>();

const { extractor, pt } = usePassthrough();

const [dtClass, dtProps] = extractor(pt.value.dt);
const [ddClass, ddProps] = extractor(pt.value.dd);

const dtStyle = 'text-sm font-medium text-gray-500';
const slots = useSlots();
const slotLabels = computed(() => Object.keys(slots).filter((key) => key.match(/^\d+$/))) as unknown as string[];
</script>

<template>
    <Wrapper :as="!oneline && 'div'" class="space-y-1">
        <dt v-if="hasSlotContent($slots.default)" data-s-dt v-bind="dtProps" :class="twMerge(dtClass, dtStyle)">
            <slot />
        </dt>

        <template v-else-if="slotLabels.length">
            <dt v-for="label in slotLabels" data-s-dt v-bind="dtProps" :key="label" :class="twMerge(dtClass, dtStyle)">
                <slot :name="label" />
            </dt>
        </template>

        <dt v-else-if="typeof labels === 'string'" data-s-dt v-bind="dtProps" :class="twMerge(dtClass, dtStyle)">{{ labels }}</dt>

        <template v-else-if="Array.isArray(labels)">
            <dt v-for="label in labels" data-s-dt v-bind="dtProps" :key="label" :class="twMerge(dtClass, dtStyle)">
                {{ label }}
            </dt>
        </template>

        

        <dd data-s-dd v-bind="ddProps" :class="twMerge(ddClass, 'text-sm text-gray-900')">
            <slot v-if="hasSlotContent($slots.description)" name="description" />
            <template v-else>{{ description }}</template>
        </dd>
    </Wrapper>
</template>
