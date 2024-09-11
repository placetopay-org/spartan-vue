<script setup lang="ts">
import type { TTooltipEmits, TTooltipProps } from './types';
import { SPopover } from '../SPopover';

defineEmits<TTooltipEmits>();

withDefaults(defineProps<TTooltipProps>(), {
    title: '',
    placement: 'bottom',
    arrow: true,
});
</script>

<template>
    <SPopover :static="static" :responsive="false" :placement="placement" :arrow="arrow" :offset="offset">
        <template #reference="{open, close}">
            <div @mouseenter="open" @mouseleave="close">
                <slot />
            </div>
        </template>

        <div class="bg-white focus-visible:outline-none text-[#344054] dark:bg-[#101828] dark:text-white shadow-lg px-3 py-2 rounded-lg">
            {{ title }}
        </div>
    </SPopover>
</template>
