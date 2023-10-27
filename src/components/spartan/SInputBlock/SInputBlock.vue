<script setup lang="ts">
import { computed } from 'vue';
import { SInput, type TInputProps } from '@spartan';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';

defineEmits<{ (event: 'update:modelValue', value: string | number | undefined): void }>();

const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps>>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const inputProps = computed(() => ({
    ...props,
    error: props.errorText ? Boolean(props.errorText) : props.error,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
}));
</script>

<template>
    <BlockWrapper wrapper="SInputBlock" v-bind="blockWrapperProps">
        <SInput
            class="w-full"
            v-bind="inputProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInput>
    </BlockWrapper>
</template>
