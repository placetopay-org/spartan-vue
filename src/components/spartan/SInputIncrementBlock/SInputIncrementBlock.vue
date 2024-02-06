<script setup lang="ts">
import { computed } from 'vue';
import { SInputIncrement, type TInputIncrementProps, type TInputIncrementEmits } from '../SInputIncrement';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';

defineEmits<TInputIncrementEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputIncrementProps>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const inputIncrementProps = computed<TInputIncrementProps>(() => {
    // @typescript-eslint/no-unused-vars
    const { label, helpText, errorText, ...rest } = props;
    return { ...rest, error: props.errorText ? Boolean(props.errorText) : props.error };
});
</script>

<template>
    <BlockWrapper wrapper="SInputBlock" v-bind="blockWrapperProps">
        <SInputIncrement
            class="w-full"
            v-bind="inputIncrementProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
