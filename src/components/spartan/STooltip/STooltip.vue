<script setup lang="ts">
import type { TTooltipProps } from './types';
import { SPopover } from '../SPopover';
import { tooltipStyles } from './styles';
import { computed } from 'vue';

const { placement = 'bottom', arrow = true, color = 'auto' } = defineProps<TTooltipProps>();

const popoverArrow = computed(() => (arrow ? color : undefined));
</script>

<template>
    <SPopover :static="static" :responsive="false" :placement="placement" :arrow="popoverArrow" :offset="offset">
        <template #reference="{ open, close }">
            <div @mouseenter="open" @mouseleave="">
                <slot />
            </div>
        </template>

        <div role="tooltip" :class="tooltipStyles({ color })">
            {{ title }}
        </div>
    </SPopover>
</template>
