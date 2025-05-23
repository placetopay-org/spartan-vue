<script setup lang="ts">
import { SInput, type TInputProps, type TInputEmits } from '../SInput';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps>>();
const [blockWrapperProps, inputProps] = extractWrapperProps<Partial<TInputProps>>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputBlock" v-bind="blockWrapperProps">
        <SInput
            :id="id"
            class="w-full"
            v-bind="inputProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInput>
    </BlockWrapper>
</template>
