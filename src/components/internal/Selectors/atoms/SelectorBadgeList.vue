<script setup lang="ts">
import { SBadge } from '@spartan';

export type TOption = Record<string, any> | string;

defineEmits<{
    (e: 'removed', option: TOption): void;
}>();

const { optionLabel = 'label', optionValue } = defineProps<{
    options?: TOption[];
    optionLabel?: string;
    optionValue?: string;
    width?: number;
}>();

const getOptionLabel = (option: TOption) => {
    if (typeof option === 'object') return option[optionLabel];
    return option;
};

const getOptionKey = (option: TOption, index: number) => {
    if (typeof option === 'object') {
        return optionValue ? option[optionValue] : option[optionLabel] ?? index;
    }
    return option;
};
</script>

<template>
    <div
        v-if="options && options.length"
        class="overflow-auto border-b border-gray-950/5 p-3 pt-0"
        :style="{ maxWidth: `${String(width)}px`, maxHeight: '74px' }"
    >
        <div class="flex flex-wrap gap-2 pt-3">
            <SBadge
                v-for="(option, index) in options"
                :key="getOptionKey(option, index)"
                size="sm"
                class="self-center whitespace-nowrap"
                pill
                removable
                @removed="$emit('removed', option)"
            >
                {{ getOptionLabel(option) }}
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
