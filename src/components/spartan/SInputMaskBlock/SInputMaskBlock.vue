<script setup lang="ts">
import { computed } from 'vue';
import { SInputMask, type TInputMaskProps, type TInputMaskEmits } from '../SInputMask';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import type { TInputProps } from '../SInput';

defineEmits<TInputMaskEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputProps> & TInputMaskProps>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const SInputMaskProps = computed<Partial<TInputProps> & TInputMaskProps>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, helpText, errorText, ...rest } = props;
    return { ...rest, error: props.errorText ? Boolean(props.errorText) : props.error };
});
</script>

<template>
    <BlockWrapper wrapper="SInputMaskBlock" v-bind="blockWrapperProps">
        <SInputMask class="w-full" v-bind="SInputMaskProps">
            <template #left><slot name="left" /></template>
            <template #right><slot name="right" /></template>
        </SInputMask>
    </BlockWrapper>
</template>
