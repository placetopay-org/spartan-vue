<script setup lang="ts">
import type { TTabProps, TTabEmits } from './types';
import { createContext } from './api';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TTabEmits>();

const props = defineProps<TTabProps>();

const context = createContext(props, emit);
</script>

<template>
    <component :is="context.variant.tab" :class="twMerge($props.class)">
        <slot />
    </component>
</template>
