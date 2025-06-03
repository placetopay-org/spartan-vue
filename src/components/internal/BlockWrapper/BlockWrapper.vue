<script setup lang="ts">
import { SCaption, SLabel } from '@spartan';
import { v4 as uuidv4 } from 'uuid';
import type { TBlockWrapperProps } from './types';
import { computed } from 'vue';

// TODO: remove wrapper prop
const props = defineProps<TBlockWrapperProps & { wrapper: string; useDpUid?: boolean }>();
const computedId = computed(() => props.id || uuidv4());
</script>

<template>
    <div class="w-full">
        <SLabel v-if="label" :for="useDpUid ? `dp-menu-${computedId}` : computedId">{{ label }}</SLabel>
        <slot :id="computedId" />
        <div v-if="helpText || errorText" class="flex flex-col">
            <SCaption v-if="helpText" class="mt-1" variant="info" :text="helpText" />
            <SCaption v-if="errorText" class="mt-1" :text="errorText" />
        </div>
    </div>
</template>
