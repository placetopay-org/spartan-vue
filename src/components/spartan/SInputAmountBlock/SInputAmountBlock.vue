<script setup lang="ts">
import { SInputAmount, type TInputAmountProps, type TInputAmountEmits } from '../SInputAmount';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import type { TInputProps } from '../SInput';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputAmountEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps> & TInputAmountProps>();
const [blockWrapperProps, inputAmountProps] = extractWrapperProps<Partial<TInputProps> & TInputAmountProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" v-bind="blockWrapperProps">
        <SInputAmount
            :id
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
