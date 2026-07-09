<script setup lang="ts">
import { ref } from 'vue';
import type { TColorSwitchEmits, TColorSwitchMode, TColorSwitchProps } from './types';
import { colorSwitchContainerStyles, colorSwitchButtonStyles, colorSwitchIconStyles } from './styles';
import {
    MonitorMobbileIcon as MonitorMobbileBold,
    Sun1Icon as Sun1Bold,
    MoonIcon as MoonBold,
} from '@placetopay/iconsax-vue/bold';
import {
    MonitorMobbileIcon as MonitorMobbileLinear,
    Sun1Icon as Sun1Linear,
    MoonIcon as MoonLinear,
} from '@placetopay/iconsax-vue/linear';

const { modelValue = 'system' } = defineProps<TColorSwitchProps>();

const emit = defineEmits<TColorSwitchEmits>();

const modes: {
    value: TColorSwitchMode;
    label: string;
    boldIcon: typeof MonitorMobbileBold;
    linearIcon: typeof MonitorMobbileLinear;
}[] = [
    { value: 'system', label: 'System', boldIcon: MonitorMobbileBold, linearIcon: MonitorMobbileLinear },
    { value: 'light', label: 'Light', boldIcon: Sun1Bold, linearIcon: Sun1Linear },
    { value: 'dark', label: 'Dark', boldIcon: MoonBold, linearIcon: MoonLinear },
];

function select(mode: TColorSwitchMode) {
    emit('update:modelValue', mode);
}

// ARIA radio-group keyboard contract (WAI-ARIA APG): arrows move the selection
// and the focus, wrapping at the ends, and only the checked option sits in the
// tab order (roving tabindex). Declaring role="radio" without this told screen
// readers to expect an interaction the component did not implement.
const buttons = ref<(HTMLButtonElement | null)[]>([]);

function moveSelection(offset: 1 | -1) {
    const current = modes.findIndex((mode) => mode.value === modelValue);
    // The modulo keeps `next` inside the array even when `current` is -1.
    const next = (current + offset + modes.length) % modes.length;
    select(modes[next]!.value);
    buttons.value[next]?.focus();
}
</script>

<template>
    <div role="radiogroup" aria-label="Color mode" :class="colorSwitchContainerStyles()">
        <button
            v-for="(mode, index) in modes"
            :key="mode.value"
            :ref="(el) => (buttons[index] = el as HTMLButtonElement | null)"
            type="button"
            role="radio"
            :aria-checked="modelValue === mode.value"
            :aria-label="mode.label"
            :tabindex="modelValue === mode.value ? 0 : -1"
            :class="colorSwitchButtonStyles({ active: modelValue === mode.value })"
            @click="select(mode.value)"
            @keydown.right.prevent="moveSelection(1)"
            @keydown.down.prevent="moveSelection(1)"
            @keydown.left.prevent="moveSelection(-1)"
            @keydown.up.prevent="moveSelection(-1)"
        >
            <component
                :is="modelValue === mode.value ? mode.boldIcon : mode.linearIcon"
                :class="colorSwitchIconStyles()"
            />
        </button>
    </div>
</template>
