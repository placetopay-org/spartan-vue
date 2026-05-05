<script setup lang="ts">
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
</script>

<template>
    <div role="radiogroup" aria-label="Color mode" :class="colorSwitchContainerStyles()">
        <button
            v-for="mode in modes"
            :key="mode.value"
            type="button"
            role="radio"
            :aria-checked="modelValue === mode.value"
            :aria-label="mode.label"
            :class="colorSwitchButtonStyles({ active: modelValue === mode.value })"
            @click="select(mode.value)"
        >
            <component
                :is="modelValue === mode.value ? mode.boldIcon : mode.linearIcon"
                :class="colorSwitchIconStyles()"
            />
        </button>
    </div>
</template>
