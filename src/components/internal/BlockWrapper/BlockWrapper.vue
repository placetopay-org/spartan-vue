<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import { SCaption, SLabel } from '@spartan';
import type { TBlockWrapperProps } from './types';
import { computed, useId } from 'vue';

const props = defineProps<TBlockWrapperProps>();
const uid = useId();
const computedId = computed(() => props.id || uid);
</script>

<template>
    <div :class="mergeClasses('w-full', props.class)">
        <SLabel v-if="label" :for="computedId">{{ label }}</SLabel>
        <slot :id="computedId" />
        <div v-if="helpText || errorText" class="flex flex-col">
            <SCaption v-if="helpText" class="mt-1" variant="info" :text="helpText" />
            <SCaption v-if="errorText" class="mt-1" :text="errorText" />
        </div>
    </div>
</template>
