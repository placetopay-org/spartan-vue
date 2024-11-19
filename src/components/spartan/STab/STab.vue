<script setup lang="ts">
import { UnderlineTab, PillTab, VetchTab } from './variants';
import type { TTabProps, TTabEmits } from './types';
import { createContext } from './api';

const emit = defineEmits<TTabEmits>();

const props = withDefaults(defineProps<TTabProps>(), {
    variant: 'underline'
});

const variants = {
    underline: UnderlineTab,
    pills: PillTab,
    vetches: VetchTab
};

createContext(props, emit);
</script>

<template>
    <component :full="full" :is="variants[variant]">
        <slot />
    </component>
</template>
