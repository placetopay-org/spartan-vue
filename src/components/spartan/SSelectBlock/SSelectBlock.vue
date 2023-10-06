<script setup lang="ts">
import { computed } from 'vue';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { SSelect, type TSelectProps } from '../SSelect';

defineEmits<{ (event: 'update:modelValue', value: string | number | undefined): void }>();

const props = defineProps<Partial<TBlockWrapperProps> & Partial<TSelectProps>>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const selectProps = computed(() => ({
    ...props,
    error: props.errorText ? Boolean(props.errorText) : props.error,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
}));
</script>

<template>
    <BlockWrapper v-bind="blockWrapperProps">
        <SSelect
            class="w-full"
            v-bind="selectProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <slot />
        </SSelect>
    </BlockWrapper>
</template>
