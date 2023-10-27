<script setup lang="ts">
import { SCaption, SLabel } from '@spartan';
import type { TBlockWrapperProps } from './types';

const props = defineProps<Partial<TBlockWrapperProps> & { wrapper: string }>();

if (props.label && !props.id) console.warn(`<${props.wrapper} />: id is required when label is provided`);
</script>

<template>
    <div>
        <SLabel v-if="label" :for="id">{{ label }}</SLabel>
        <slot />
        <div v-if="helpText || errorText" class="flex flex-col">
            <SCaption v-if="helpText" class="mt-1" variant="info" :text="helpText" />
            <SCaption v-if="errorText" class="mt-1" :text="errorText" />
        </div>
    </div>
</template>
