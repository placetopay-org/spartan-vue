<script setup lang="ts">
import { SInputMask, type TInputMaskProps, type TInputMaskEmits } from '../SInputMask';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import type { TInputProps } from '../SInput';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputMaskEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps> & TInputMaskProps>();
const [blockWrapperProps, inputMaskProps] = extractWrapperProps<Partial<TInputProps> & TInputMaskProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputMaskBlock" v-bind="blockWrapperProps">
        <SInputMask :id="id" class="w-full" v-bind="inputMaskProps">
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInputMask>
    </BlockWrapper>
</template>
