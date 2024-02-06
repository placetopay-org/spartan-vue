<script setup lang="ts">
import { computed } from 'vue';
import { SInputAmount, type TInputAmountProps, type TInputAmountEmits } from '../SInputAmount';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import type { TInputProps } from '../SInput';

defineEmits<TInputAmountEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps> & TInputAmountProps>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const inputAmountProps = computed<TInputAmountProps>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, helpText, errorText, ...rest } = props;
    return { ...rest, error: props.errorText ? Boolean(props.errorText) : props.error };
});
</script>

<template>
    <BlockWrapper wrapper="SInputAmountBlock" v-bind="blockWrapperProps">
        <SInputAmount
            class="w-full"
            v-bind="inputAmountProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @update:currency="(newCurrency) => $emit('update:currency', newCurrency)"
        >
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInputAmount>
    </BlockWrapper>
</template>
