<script setup lang="ts">
import { computed } from 'vue';
import { SCombobox, type TComboboxProps } from '../SCombobox';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';

defineEmits<{ (event: 'update:modelValue', value: string | number | object): void }>();

const props = defineProps<Partial<TBlockWrapperProps> & Partial<TComboboxProps>>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const comboboxProps = computed(() => ({
    ...props,
    error: props.errorText ? Boolean(props.errorText) : props.error,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
}));
</script>

<template>
    <BlockWrapper wrapper="SComboboxBlock" v-bind="blockWrapperProps">
        <SCombobox
            class="w-full"
            v-bind="comboboxProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <slot />
            <!-- <template #label>
                <SLabel v-if="label" :for="id">{{ label }}</SLabel>
            </template> -->
            <template #button><slot name="button" /></template>
        </SCombobox>
    </BlockWrapper>
</template>
