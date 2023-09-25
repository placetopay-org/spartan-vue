<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SLabel, type TInputProps } from '@spartan';
import { HelpAndErrorTexts } from '@/components/internal';

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
        <SInput v-bind="inputProps" />
        <HelpAndErrorTexts :error="errorText" :help="helpText" />
    </div>
</template>
