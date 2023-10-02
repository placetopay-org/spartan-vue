<script setup lang="ts">
import { computed } from 'vue';
import { SLabel } from '../SLabel';
import { SCombobox, type TComboboxProps } from '../SCombobox';
import { HelpAndErrorTexts } from '@internal';

const props = withDefaults(
    defineProps<
        Partial<{ errorText: string; helpText: string; label: string }> & Omit<Partial<TComboboxProps>, 'error'>
    >(),
    {
        errorText: undefined,
        helpText: undefined,
        label: undefined,
    },
);

const comboboxProps = computed(() => ({
    ...props,
    error: Boolean(props.errorText),
    helpText: undefined,
    label: undefined,
}));
</script>

<template>
    <div>
        <SLabel v-if="label" :for="id">{{ label }}</SLabel>
        <SCombobox v-bind="comboboxProps">
            <slot />
        </SCombobox>
        <HelpAndErrorTexts :error="errorText" :help="helpText" />
    </div>
</template>
