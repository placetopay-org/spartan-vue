<script setup lang="ts">
import { Wrapper } from '@internal';
import { mergeClasses, hasSlotContent, usePassthrough } from '@/helpers';
import { computed, useSlots } from 'vue';
import type { TDefinitionTermProps } from './types';

defineProps<TDefinitionTermProps>();

const { extractor, pt } = usePassthrough();

const [dtClass, dtProps] = extractor(pt.value.dt);
const [ddClass, ddProps] = extractor(pt.value.dd);

const dtStyle = 'text-sm font-medium text-gray-500 dark:text-gray-400';
const slots = useSlots();
const slotLabels = computed(() => Object.keys(slots).filter((key) => key.match(/^\d+$/))) as unknown as string[];
</script>

<template>
    <Wrapper :as="!oneline && 'div'" :class="mergeClasses('space-y-1', $props.class)">
        <dt v-if="hasSlotContent($slots.default)" data-s-dt v-bind="dtProps" :class="mergeClasses(dtStyle, dtClass)">
            <slot />
        </dt>

        <template v-else-if="slotLabels.length">
            <dt
                v-for="label in slotLabels"
                v-bind="dtProps"
                :key="label"
                data-s-dt
                :class="mergeClasses(dtStyle, dtClass)"
            >
                <slot :name="label" />
            </dt>
        </template>

        <dt v-else-if="typeof labels === 'string'" data-s-dt v-bind="dtProps" :class="mergeClasses(dtStyle, dtClass)">
            {{ labels }}
        </dt>

        <template v-else-if="Array.isArray(labels)">
            <dt v-for="label in labels" v-bind="dtProps" :key="label" data-s-dt :class="mergeClasses(dtStyle, dtClass)">
                {{ label }}
            </dt>
        </template>

        <dd data-s-dd v-bind="ddProps" :class="mergeClasses('text-sm text-gray-900 dark:text-gray-50', ddClass)">
            <slot v-if="hasSlotContent($slots.description)" name="description" />
            <template v-else>{{ description }}</template>
        </dd>
    </Wrapper>
</template>
