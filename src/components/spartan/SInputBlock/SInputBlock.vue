<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SLabel, type TInputProps } from '@spartan';
import { HelpAndErrorTexts } from '@internal';

defineEmits<{
    (event: 'update:modelValue', value: string | number | undefined): void;
}>();

const props = withDefaults(
    defineProps<
        Partial<{ errorText: string; helpText: string; label: string }> & Omit<Partial<TInputProps>, 'error'>
    >(),
    {
        errorText: undefined,
        helpText: undefined,
        label: undefined,
    },
);

const inputProps = computed(() => ({
    ...props,
    error: Boolean(props.errorText),
    helpText: undefined,
    label: undefined,
}));
</script>

<template>
    <div>
        <SLabel v-if="label" :for="id">{{ label }}</SLabel>
        <SInput v-bind="inputProps" @update:model-value="(newValue) => $emit('update:modelValue', newValue)">
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInput>
        <HelpAndErrorTexts :error="errorText" :help="helpText" />
    </div>
</template>
