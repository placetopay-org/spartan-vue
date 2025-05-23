<script setup lang="ts">
import { SBadge } from '@spartan';

export type TOption = Record<string, any>;

defineEmits<{
    (e: 'removed', option: TOption): void;
}>();

defineProps<{
    options?: TOption[];
    optionLabel: string;
    width?: number;
}>();
</script>

<template>
    <div
        v-if="options && options.length"
        class="overflow-auto border-b border-gray-950/5 p-3 pt-0"
        :style="{ maxWidth: `${String(width)}px`, maxHeight: '74px' }"
    >
        <div class="flex flex-wrap gap-2 pt-3">
            <SBadge
                v-for="option in options"
                size="sm"
                class="self-center whitespace-nowrap"
                pill
                removable
                @removed="$emit('removed', option)"
            >
                {{ option[optionLabel] }}
            </SBadge>
        </div>
    </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 0px;
}
</style>
